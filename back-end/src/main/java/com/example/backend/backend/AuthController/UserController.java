package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Service.UserService;
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


    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }

}
