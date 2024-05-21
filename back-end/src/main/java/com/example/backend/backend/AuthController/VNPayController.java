package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Notification;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Response.NotificationMessage;
import com.example.backend.backend.Repository.NotificationRepository;
import com.example.backend.backend.Service.UserService;
import com.example.backend.backend.VnpayConfig.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Controller
@RequestMapping("/vnpay")

//api liên quan tới thanh toán đơn hàng online bằng vnpay
//sử dụng thymeleaf để tạo các trang thông báo thành công/ thất bại
public class VNPayController {
    //tiêm Vnpayservice vào
    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private final UserService userService;
    private final NotificationRepository notificationRepository;
    public VNPayController(UserService userService, NotificationRepository notificationRepository) {
        this.userService = userService;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("")
    //trang thanh toán thành công(không gọi trực tiếp tới, chỉ dùng để test)
    public String home(){
        return "ordersuccess";
    }

    //khởi tạo đơn thanh toán online, chứa thông tin tổng tiền và thông tin đơn hàng
    @PostMapping("/submitOrder")
    public ResponseEntity<String> submidOrder2(@RequestParam("amount") Long orderTotal,
                                               @RequestParam("orderInfo") String orderInfo,
                                               HttpServletRequest request){
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user= userService.getById(getUserId(userDetails))
                    .orElseThrow(()->new RuntimeException("user not found"));
            userService.createTransaction(user,orderTotal,Integer.parseInt(orderInfo));
            String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            String vnpayUrl = vnPayService.createOrder(orderTotal, user.getId()+"_"+Integer.parseInt(orderInfo), baseUrl);
            return ResponseEntity.ok(vnpayUrl);
    }

    //vnpay sẽ trả kết quả về api này để xử lý và trả kết quả tới người dùng

    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model){
        User user = userService.getById(request.getParameter("vnp_OrderInfo").split("_")[0])
                .orElseThrow(()->new RuntimeException("transaction not found"));

        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount").substring(0,request.getParameter("vnp_Amount").length()-2);
        // Định dạng lại thời gian thanh toán
        LocalDateTime paymentDateTime = LocalDateTime.parse(paymentTime, DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String formattedPaymentTime = paymentDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", formattedPaymentTime);
        model.addAttribute("transactionId", transactionId);
        boolean status=false;
        if(paymentStatus == 1){
            status=userService.completeTransaction(user,Long.parseLong(String.valueOf(request.getParameter("vnp_Amount").substring(0,request.getParameter("vnp_Amount").length()-2))),Integer.parseInt(request.getParameter("vnp_OrderInfo").split("_")[1]));
            NotificationMessage notificationMessage= new NotificationMessage();
            notificationMessage.setContent(user.getName()+" vừa thanh toán thành công "+ totalPrice+" đồng");
            messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
            Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,0,true,false);
            notificationRepository.save(notification);
        }
        return (paymentStatus == 1 && status) ? "ordersuccess" : "orderfail";
    }

    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
