package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Entity.Notification;
import com.example.backend.backend.Entity.Order;
import com.example.backend.backend.Entity.Transaction;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Dashboard.DashQuantity;
import com.example.backend.backend.Payload.Dashboard.Dashboard;
import com.example.backend.backend.Payload.Order.OrderInfoAdmin;
import com.example.backend.backend.Payload.Product.*;
import com.example.backend.backend.Payload.Response.Email;
import com.example.backend.backend.Payload.Response.NotificationMessage;
import com.example.backend.backend.Payload.Response.UserDashboard;
import com.example.backend.backend.Payload.Response.UserInfoToAdmin;
import com.example.backend.backend.Repository.*;
import com.example.backend.backend.Service.ProductService;
import com.example.backend.backend.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProductService productService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CommentRepository commentRepository;
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final NotificationRepository notificationRepository;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    @Autowired
    private ModelMapper modelMapper;
    public AdminController(ProductService productService, UserRepository userRepository, OrderRepository orderRepository, CommentRepository commentRepository, TransactionRepository transactionRepository, UserService userService, NotificationRepository notificationRepository) {
        this.productService = productService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.commentRepository = commentRepository;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.notificationRepository = notificationRepository;
    }

    @PostMapping("/product")
    public ResponseEntity<?> createProduct(@RequestBody ProductCreateReq productCreateReq)
    {
        return ResponseEntity.ok(modelMapper.map(productService.createProduct(productCreateReq),productCreateReq.getClass()));
    }

    @GetMapping("/sizes")
    public ResponseEntity<?> getAllSizes(){
        return ResponseEntity.ok(productService.getAllSize());
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProduct(){
        return ResponseEntity.ok(productService.getAllProducts().stream().map(product -> modelMapper.map(product, InfoProductAdmin.class)));
    }

    @PutMapping("/product")
    public ResponseEntity<?> putProduct(@RequestBody InfoProduct infoProduct){
        return ResponseEntity.ok(modelMapper.map(productService.putBaseInfo(infoProduct),InfoProduct.class));
    }

    @PutMapping("/quantity")
    public ResponseEntity<?> putQuantity(@RequestBody ProductQuantityChange productQuantityChange)
    {
        return ResponseEntity.ok(productService.putQuantity(productQuantityChange));
    }

    @PutMapping("/images")
    public ResponseEntity<?> putImages(@RequestBody ImageChangeReq imageChangeReq){
        return ResponseEntity.ok(productService.putImages(imageChangeReq));
    }

    @GetMapping("/userDashboardBase")
    public ResponseEntity<?> baseUserDash(){
        UserDashboard userDashboard= new UserDashboard();
        userDashboard.setCountUser(userRepository.count());
        userDashboard.setCountUserpay(orderRepository.countDistinctValues());
        userDashboard.setCountComment(commentRepository.count());
        return ResponseEntity.ok(userDashboard);
    }

    @GetMapping("/currentTransaction")
    public ResponseEntity<?> currentTransaction(){
        Pageable pageable= PageRequest.of(0,5);
        return ResponseEntity.ok(transactionRepository.findTop5ByIdDesc(pageable));
    }

    @GetMapping("/users")
    public ResponseEntity<?> allUser(){
        List<User> users= userRepository.findAll();
        List<UserInfoToAdmin> userInfoToAdmins= new ArrayList<>();
        for (User user:users
             ) {
            UserInfoToAdmin userInfoToAdmin= modelMapper.map(user,UserInfoToAdmin.class);
            List<Transaction> transactions= transactionRepository.findAllByUser(user);
            Long paid=0L;
            for (Transaction transaction:transactions
                 ) {
                paid+=transaction.getMoney();
            }
            userInfoToAdmin.setPaid(paid);
            userInfoToAdmins.add(userInfoToAdmin);
        }
        return ResponseEntity.ok(userInfoToAdmins);
    }
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders()
    {
        List<?> orders= orderRepository.findAll();
        Collections.reverse(orders);
        return ResponseEntity.ok(orders.stream().map(item->modelMapper.map(item, OrderInfoAdmin.class)));
    }

    @PutMapping("/order")
    public ResponseEntity<?> putOrderStatus(@RequestParam("id") int id, @RequestParam("status")EStatus status){
        NotificationMessage notificationMessage= new NotificationMessage();
        Order order= orderRepository.findById(id)
                .orElseThrow(()->new RuntimeException("order not found"));
        User user= order.getUser();
        String topic=user.getAccount();
        notificationMessage.setAdmin(false);
        notificationMessage.setSender("System");
        notificationMessage.setTimestamp(new Date());
        if(status==EStatus.CANCELLED){
            notificationMessage.setContent("Đơn hàng mã "+id+" của bạn đã bị hủy bị người bán!");
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,id,false,false);
            notificationRepository.save(notification);
            messagingTemplate.convertAndSend(String.format("/topic/%s", topic), notificationMessage);
        }else if(status==EStatus.CONFIRMED){
            notificationMessage.setContent("Đơn hàng mã "+id+" của bạn đã được xác nhận!");
            messagingTemplate.convertAndSend(String.format("/topic/%s", topic), notificationMessage);
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,id,false,false);
            notificationRepository.save(notification);
        }else if(status==EStatus.SENDING){
            notificationMessage.setContent("Đơn hàng mã "+id+" của bạn đã được gửi đi, hãy sẵn sàng để nhận hàng!");
            messagingTemplate.convertAndSend(String.format("/topic/%s", topic), notificationMessage);
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,id,false,false);
            notificationRepository.save(notification);
        }else if(status==EStatus.SUCCESS){
            notificationMessage.setContent("Đơn hàng mã "+id+" của bạn đã thành công, cảm ơn bạn đã mua hàng!");
            messagingTemplate.convertAndSend(String.format("/topic/%s", topic), notificationMessage);
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,id,false,false);
            notificationRepository.save(notification);
        }
        return ResponseEntity.ok(userService.putOrder(id,status));

    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getALlNotifications(){
        return ResponseEntity.ok(notificationRepository.findAllAdminNotifications());
    }

    @Transactional
    @DeleteMapping("/notification")
    public ResponseEntity<?> deleteNotification(@RequestParam("id") Long id){
        Notification notification= notificationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("notification not found"));
        notificationRepository.delete(notification);
        return ResponseEntity.ok("deleted");
    }

    @GetMapping("/dasboard")
    public ResponseEntity<?> getDashBoard(){
        Dashboard dashboard= new Dashboard();
        dashboard.setToday(new DashQuantity(productService.totalCostToday(),productService.countOrdersToday()));
        dashboard.setThisWeek(new DashQuantity(productService.totalCostThisWeek(),productService.countOrdersThisWeek()));
        dashboard.setListmonths1(productService.findallCostMonth(1));
        dashboard.setListmonths2(productService.findallCostMonth(2));
        dashboard.setListmonths3(productService.findallCostMonth(3));
        dashboard.setListmonths4(productService.findallCostMonth(4));
        dashboard.setListmonths5(productService.findallCostMonth(5));
        dashboard.setListmonths6(productService.findallCostMonth(6));

        return ResponseEntity.ok(dashboard);
    }
    @PutMapping("/toggleShow")
    public ResponseEntity<?> toggle(@RequestParam("id") int id)
    {
        return ResponseEntity.ok(productService.toggleShow(id));
    }

    @GetMapping("/live")
    public ResponseEntity<?> startLive(){
        NotificationMessage notificationMessage= new NotificationMessage();
        notificationMessage.setContent("Quản trị viên vừa bắt đầu buổi livestream!");
        notificationMessage.setAdmin(false);
        notificationMessage.setSender("System");
        notificationMessage.setTimestamp(new Date());
        List<User> users= userRepository.findAll();
        for (User user:users
             ) {
            String topic= user.getAccount();
            messagingTemplate.convertAndSend(String.format("/topic/%s", topic), notificationMessage);
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user, 0,false,false);
            notificationRepository.save(notification);
        }
        return ResponseEntity.ok("sended");
    }
    @GetMapping("/sendemail")
    public ResponseEntity<?> sendEmail(@RequestParam("content") String content)
    {
        List<String> emails= userService.getAllDistinctByEmail();
        String bearerToken="eyJ0eXAiOiJKV1QiLCJub25jZSI6IkptX2s3dWRSbDl1c2FyVkNscW9NdFRCNTNGbV9sNkd1VTNnUW5QSFFDQ3MiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNzE3NDYwMjg4LCJuYmYiOjE3MTc0NjAyODgsImV4cCI6MTcxNzU0Njk4OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQVQxcURTclJNbzF3U0VORGo4N3RkN1NNNDRxZzhhRWFyNXRwTkpHNjdqTEszTjBLZUdIOTB2RU9tOGtheE9qNFIiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjQ4MDI6MWQ4NTpkYjEwOmQxYzI6ODczMzo3NmQxOmRkNyIsIm5hbWUiOiJNYWkgTWluaCBIb2FuZyAyMDIxNTM4MSIsIm9pZCI6IjA1MTliMmUzLWRmODAtNGIzNC1hOTQ5LTdhNDQyMTM2MTdjNyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yNzQ2MjUxMDA3LTEzMjQ1OTUyMDYtNzgxNjU0MzUxLTg4Mzc2IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxODUyMzNEMUEiLCJyaCI6IjAuQVhJQW43anhCdWdIVDBhMENPd2JSWEFfTVFNQUFBQUFBQUFBd0FBQUFBQUFBQUREQUtNLiIsInNjcCI6IkZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgTWFpbC5SZWFkIE1haWwuUmVhZEJhc2ljIE1haWwuUmVhZFdyaXRlIE1haWwuU2VuZCBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFRhc2tzLlJlYWQgVGFza3MuUmVhZFdyaXRlIFRlYW0uUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWQgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoicUswR28tSzRWcHN5dWZMSk90OEM0dVNpTHQ2NE5TVFJoNEVIbDBjb0V0SSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjA2ZjFiODlmLTA3ZTgtNDY0Zi1iNDA4LWVjMWI0NTcwM2YzMSIsInVuaXF1ZV9uYW1lIjoiSG9hbmcuTU0yMTUzODFAc2lzLmh1c3QuZWR1LnZuIiwidXBuIjoiSG9hbmcuTU0yMTUzODFAc2lzLmh1c3QuZWR1LnZuIiwidXRpIjoiejUyVmt5ak1nRWV5MV9kam9yWUZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiNVkzbERoS2ZjUW5MYjdBMXprSkhfYmwwcEptb3pLM2FrQXlNejFRYVVsUSJ9LCJ4bXNfdGNkdCI6MTUwMjg3MTE0Mn0.F0bMMy6Sj3wsQ56XAKQ6ivByjfahDXNdIAKr2HcCrrdptTTjiEQVZzyoYi9c3hrn4g-HbVx2bNtOt3Ens3-97QroIjCAWAD-A_sycNGjdOcKdh0obzq8H911bVN6TTVdRQTHODXd2F6EOy-vBs7I3cIe4StsgSRqnGzs6I_Z_Gz64tC7XEhi6HfnTryLh9Cij-zuewpvvfltuKVrtRk4OrmB8J0gz93qW6rXW7rd4lZHJVQB6QMVEfb7a_lsBM1QsdDuIjmO54nK6u25J8mSADYkSwkYKFKK85vKFuBQEJuK7r7mIJqjm3VYQ-QKhwo0kpUz9JF3Vp-srvQYTa_Mag";

        for (String email:emails
             ) {
            if(email.isEmpty()|| email.length()<10 || !email.contains("@")){
                continue;
            }
            Email emailMessage = new Email();

            // Thiết lập subject
            emailMessage.getMessage().setSubject("Thông báo từ shop w15Store");

            // Thiết lập body
            Email.Body body = new Email.Body();
            body.setContentType("Text");

            body.setContent(content);
            emailMessage.getMessage().setBody(body);

            // Thiết lập toRecipients
            Email.Recipient recipient = new Email.Recipient();
            Email.EmailAddress emailAddress = new Email.EmailAddress();
            emailAddress.setAddress(email);
            recipient.setEmailAddress(emailAddress);
            emailMessage.getMessage().setToRecipients(List.of(recipient));

            // Thiết lập saveToSentItems
            emailMessage.setSaveToSentItems(true);
// Tạo đối tượng RestTemplate
            RestTemplate restTemplate = new RestTemplate();

            // Tạo header chứa bearer token
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(bearerToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            // Chuyển đối tượng EmailMessage thành chuỗi JSON
            String requestBody;
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                requestBody = objectMapper.writeValueAsString(emailMessage);
                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                // Gửi yêu cầu POST
                ResponseEntity<String> responseEntity = restTemplate.exchange(
                        "https://graph.microsoft.com/v1.0/me/sendMail",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

                // Kiểm tra mã trạng thái phản hồi
                if (responseEntity.getStatusCode() == HttpStatus.OK) {
                    System.out.println("Email sent successfully.");
                } else {
                    System.out.println("Failed to send email. Status code: " + responseEntity.getStatusCode());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok("");

    }
}
