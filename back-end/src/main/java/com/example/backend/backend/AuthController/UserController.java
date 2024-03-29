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
    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
