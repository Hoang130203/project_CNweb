package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Payload.Order.OrderInfo;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Payload.User.UserInfo;
import com.example.backend.backend.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/cart")
    public ResponseEntity<?> postToCart(@RequestBody PostCart postCart){

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        userService.addProductToCart(postCart,getUserId(userDetails));
        return ResponseEntity.ok("");

    }

    @GetMapping("/carts")
    public ResponseEntity<?> getCarts(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(userService.getCart(getUserId(userDetails)));
    }


    @DeleteMapping("/cart")
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
    @PostMapping("/order")
    public ResponseEntity<?> postOrder(@RequestBody OrderInfo orderInfo){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String posted = userService.postOrder(orderInfo,getUserId(userDetails));
        return ResponseEntity.ok(new Message(posted));
    }
    @PutMapping("/cancelOrder")
    public ResponseEntity<?> deleteOrder(@RequestParam("orderId") int orderid){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        boolean delete = userService.cancelOrder(getUserId(userDetails),orderid);
        return delete?ResponseEntity.ok(new Message("Đã hủy")):ResponseEntity.ok(new Message("Lỗi"));
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        return ResponseEntity.ok(userService.getOrders(getUserId(userDetails)));
    }
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



    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }

}
