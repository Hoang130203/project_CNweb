package com.example.backend.backend.AuthController;


import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Service.UserService;
import com.example.backend.backend.payos.PayOS;
import com.example.backend.backend.payos.type.ItemData;
import com.example.backend.backend.payos.type.PaymentData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payos")
public class PayOsController {
    private final PayOS payOS;
    private final UserService userService;
//    private String base_url="http://localhost:8081";
//        private String base_url2="http://localhost:3000";
    private String base_url="https://project-cnweb.onrender.com";
    private String base_url2="https://project-c-nweb.vercel.app";

    public PayOsController(PayOS payOS, UserService userService) {
        super();
        this.payOS = payOS;
        this.userService = userService;
    }
//    @RequestMapping(value = "/")
//    public String Index() {
//        return "index";
//    }
    @RequestMapping( "/success")
    public String Success(@RequestParam("userId") String userId,@RequestParam("amount") Long amount,@RequestParam("orderId") int orderId) {
        User user = userService.getById(userId)
                .orElseThrow(()->new RuntimeException("transaction not found"));
        boolean status= userService.completeTransaction(user,amount,orderId);
        return "<a href=\"https://project-c-nweb.vercel.app\" id=\"return-page-btn\">Trở về</a>";
    }
//    @RequestMapping(value = "/cancel")
//    public String Cancel() {
//        return "cancel";
//    }
    @PostMapping("/create-payment-link")
//    @RequestMapping(method = RequestMethod.POST, value = "/create-payment-link", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> checkout(HttpServletResponse httpServletResponse,
                                   @RequestParam("amount") Long orderTotal,
                                   @RequestParam("orderId") int orderId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
//        System.out.println(userDetails);
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("user not found"));
        userService.createTransaction(user,orderTotal,orderId);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            final String productName = "Thanh toán đơn hàng";
            final String description = "Mã đơn hàng: "+orderId;
            final String returnUrl = base_url + "/payos/success?userId="+user.getId()+"&amount="+orderTotal+"&orderId="+orderId;
            final String cancelUrl = base_url2 + "/";
            final Long price = orderTotal;
            // Gen order code
            String currentTimeString = String.valueOf(new Date().getTime());
            int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
            ItemData item = new ItemData(productName, 1,price.intValue());
            List<ItemData> itemList = new ArrayList<>();
            itemList.add(item);
            PaymentData paymentData = new PaymentData(orderCode, price.intValue()/1000000+10000, description,
                    itemList, cancelUrl, returnUrl);
            JsonNode data = payOS.createPaymentLink(paymentData);

            String checkoutUrl = data.get("checkoutUrl").asText();

            httpServletResponse.setHeader("Location", checkoutUrl);
            httpServletResponse.setStatus(302);
            return ResponseEntity.ok(checkoutUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
