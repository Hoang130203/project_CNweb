package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Notification;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Payload.Order.OrderInfo;
import com.example.backend.backend.Payload.Product.BaseInfoProduct;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Payload.Response.NotificationMessage;
import com.example.backend.backend.Payload.User.UserInfo;
import com.example.backend.backend.Repository.NotificationRepository;
import com.example.backend.backend.Service.ProductService;
import com.example.backend.backend.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
//api liên quan tới người dùng
public class UserController {
    //tiêm các service cần thiết vào
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationRepository notificationRepository;
    private final ProductService productService;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ModelMapper modelMapper;
    public UserController(UserService userService, PasswordEncoder passwordEncoder, NotificationRepository notificationRepository, ProductService productService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.notificationRepository = notificationRepository;
        this.productService = productService;
    }
    //thêm sản phẩm vào giỏ hàng
    @PostMapping("/cart")
    public ResponseEntity<?> postToCart(@RequestBody PostCart postCart){

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        userService.addProductToCart(postCart,getUserId(userDetails));
        return ResponseEntity.ok("");

    }

    //lấy ra các sản phẩm trong giỏ hàng
    @GetMapping("/carts")
    public ResponseEntity<?> getCarts(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(userService.getCart(getUserId(userDetails)));
    }


    //xóa 1 số sản phẩm đã chọn khỏi giỏ hàng
    @PutMapping("/cart")
    public ResponseEntity<?> deleteCart(@RequestBody List<PostCart> postCarts){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        boolean deleted=false;
        for (PostCart postCart:postCarts
             ) {
            deleted=userService.delete(postCart, getUserId(userDetails));

        }
        if (deleted){
            return ResponseEntity.ok(new Message("Đã xóa"));
        }else{
            return ResponseEntity.ok(new Message("Chưa xóa"));
        }
    }

    //tạo đơn hàng
    @PostMapping("/order")
    public ResponseEntity<?> postOrder(@RequestBody OrderInfo orderInfo){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String posted = userService.postOrder(orderInfo,getUserId(userDetails));
        return ResponseEntity.ok(new Message(posted));
    }

    @GetMapping("/order")
    public ResponseEntity<?> getOrder(@RequestParam("id") int id){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(userService.getOrder(getUserId(userDetails),id));
    }
    //hủy đơn hàng
    @PutMapping("/cancelOrder")
    public ResponseEntity<?> deleteOrder(@RequestParam("orderId") int orderid){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        boolean delete = userService.cancelOrder(getUserId(userDetails),orderid);
        NotificationMessage notificationMessage= new NotificationMessage("Đơn hàng mã "+orderid+" đã bị hủy bởi người mua!",new Date(),"System",true);
        messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
        Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), null,0,true,false);
        notificationRepository.save(notification);
        return delete?ResponseEntity.ok(new Message("Đã hủy")):ResponseEntity.ok(new Message("Lỗi"));
    }

    //Lấy ra các đơn hàng của người dùng
    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        return ResponseEntity.ok(userService.getOrders(getUserId(userDetails)));
    }

    //Lấy thông tin người dùng
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Optional<User> user= userService.getById(getUserId(userDetails));
        if (user.isPresent()){
            return ResponseEntity.ok(modelMapper.map(user.get(), UserInfo.class));
        }else{
            return ResponseEntity.ok(new Message("User not exists"));
        }
    }

    //Update thông tin của người dùng
    @PutMapping("/update")
    public ResponseEntity<?> upDate(@RequestBody UserInfo userInfo){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Optional<User> user= userService.getById(getUserId(userDetails));
        if(user.isPresent()){
            User user1= user.get();
            user1.setName(userInfo.getName());
            user1.setAvatar(userInfo.getAvatar());
            user1.setEmail(userInfo.getEmail());
            user1.setAddress(userInfo.getAddress());
            user1.setPhone(userInfo.getPhone());
            userService.save(user1);
        }
        return ResponseEntity.ok(new Message("Đã cập nhật"));
    }

    @PutMapping("/password")
    public ResponseEntity<?> changPassword(@RequestParam("old") String oldPass,@RequestParam("new") String newPass){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()-> new RuntimeException("user not found"));
        System.out.println(oldPass);
        if(passwordEncoder.matches(oldPass,user.getPassword())){
            System.out.println("change");
            user.setPassword(passwordEncoder.encode(newPass));
            userService.save(user);
            return ResponseEntity.ok(newPass);
        }
        return ResponseEntity.ok(oldPass);
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getAllNotifications(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()-> new RuntimeException("user not found"));
        return ResponseEntity.ok(userService.getNotifications(user));
    }
    @GetMapping("/keyword")
    public ResponseEntity<?> getAllByKeyword(String key, Pageable pageable){
        return ResponseEntity.ok(productService.findAllByKeyword(key,pageable));
    }
    //lấy ra id người dùng
    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }

}
