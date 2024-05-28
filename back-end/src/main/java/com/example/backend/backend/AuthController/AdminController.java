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
    @GetMapping("/sendemail")
    public ResponseEntity<?> sendEmail(@RequestParam("content") String content)
    {
        List<String> emails= userService.getAllDistinctByEmail();
        String bearerToken="eyJ0eXAiOiJKV1QiLCJub25jZSI6ImdpLTd3U0ZWQlpWQzA3UmlZcnBIUkY1dEJ3Zl9lOGo4S3E4VFloNWJNZEkiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNzE2NzEzMzY3LCJuYmYiOjE3MTY3MTMzNjcsImV4cCI6MTcxNjgwMDA2NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQTdFdnlIRlNkOHNhL3hOMGFiU0grWWwwNkYxU1VmTlhBbStDYUorYlJOV3ZhUTJJWGtoSmtMUm9aS2ZPbmRaVlkiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjQ4MDI6MWQ2ODpjYzA6OGRjNzo4YTA3OjIyZDplNWE1IiwibmFtZSI6Ik1haSBNaW5oIEhvYW5nIDIwMjE1MzgxIiwib2lkIjoiMDUxOWIyZTMtZGY4MC00YjM0LWE5NDktN2E0NDIxMzYxN2M3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTI3NDYyNTEwMDctMTMyNDU5NTIwNi03ODE2NTQzNTEtODgzNzYiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDE4NTIzM0QxQSIsInJoIjoiMC5BWElBbjdqeEJ1Z0hUMGEwQ093YlJYQV9NUU1BQUFBQUFBQUF3QUFBQUFBQUFBRERBS00uIiwic2NwIjoiRmlsZXMuUmVhZCBGaWxlcy5SZWFkLkFsbCBGaWxlcy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWQgTWFpbC5SZWFkQmFzaWMgTWFpbC5SZWFkV3JpdGUgTWFpbC5TZW5kIG9wZW5pZCBwcm9maWxlIFNpdGVzLlJlYWQuQWxsIFNpdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZCBUYXNrcy5SZWFkV3JpdGUgVGVhbS5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJxSzBHby1LNFZwc3l1ZkxKT3Q4QzR1U2lMdDY0TlNUUmg0RUhsMGNvRXRJIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiMDZmMWI4OWYtMDdlOC00NjRmLWI0MDgtZWMxYjQ1NzAzZjMxIiwidW5pcXVlX25hbWUiOiJIb2FuZy5NTTIxNTM4MUBzaXMuaHVzdC5lZHUudm4iLCJ1cG4iOiJIb2FuZy5NTTIxNTM4MUBzaXMuaHVzdC5lZHUudm4iLCJ1dGkiOiJIcjVmNC1MWU1reTd0ZlhOd0JaUUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiI1WTNsRGhLZmNRbkxiN0ExemtKSF9ibDBwSm1vekszYWtBeU16MVFhVWxRIn0sInhtc190Y2R0IjoxNTAyODcxMTQyfQ.MwbAQldka7_yiaT5weV-pUpyKF3ijPpLqlhEuWkW_jP1G37kVao1Kc4EVNBESX7tUttyYp8lT95CvztKd8vJtZhwR0WAGzQ-lfeg199jv7TUdGB_fboPhWbsIbEGNMubYEi2U5meYh6rLd4ZswZpWvKaWSAGaheAnHpAl-gDO0IzjEyBWWNAROQoWj8DUeSwzS1RSzSfHO7fNDNjLVSTebAPxKieU3SjkMPZ4iIYXBjvCEuIzVaj7dqb7sYZO96sd_zQ_m48Dmhz5gNRRi4pTG6fq2R1EKXrK3YO7lU6XAEl8lI1PIv6AH30B_HrPIq-2fCCTkIMef_wSfFreWIKIw";

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
