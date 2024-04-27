package com.example.backend.backend.AuthController;

import com.example.backend.backend.VnpayConfig.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@RequestMapping("/vnpay")

//api liên quan tới thanh toán đơn hàng online bằng vnpay
//sử dụng thymeleaf để tạo các trang thông báo thành công/ thất bại
public class VNPayController {
    //tiêm Vnpayservice vào
    @Autowired
    private VNPayService vnPayService;

    @GetMapping("")
    //trang thanh toán thành công(không gọi trực tiếp tới, chỉ dùng để test)
    public String home(){
        return "ordersuccess";
    }

    //khởi tạo đơn thanh toán online, chứa thông tin tổng tiền và thông tin đơn hàng
    @PostMapping("/submitOrder")
    public ResponseEntity<String> submidOrder2(@RequestParam("amount") int orderTotal,
                                               @RequestParam("orderInfo") String orderInfo,
                                               HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return ResponseEntity.ok(vnpayUrl);
    }

    //vnpay sẽ trả kết quả về api này để xử lý và trả kết quả tới người dùng

    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");
        // Định dạng lại thời gian thanh toán
        LocalDateTime paymentDateTime = LocalDateTime.parse(paymentTime, DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String formattedPaymentTime = paymentDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", formattedPaymentTime);
        model.addAttribute("transactionId", transactionId);

        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
    }
}
