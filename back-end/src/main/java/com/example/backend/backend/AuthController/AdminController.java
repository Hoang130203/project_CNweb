package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Entity.Transaction;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Order.OrderInfoAdmin;
import com.example.backend.backend.Payload.Product.*;
import com.example.backend.backend.Payload.Response.UserDashboard;
import com.example.backend.backend.Payload.Response.UserInfoToAdmin;
import com.example.backend.backend.Repository.CommentRepository;
import com.example.backend.backend.Repository.OrderRepository;
import com.example.backend.backend.Repository.TransactionRepository;
import com.example.backend.backend.Repository.UserRepository;
import com.example.backend.backend.Service.ProductService;
import com.example.backend.backend.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
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
    @Autowired
    private ModelMapper modelMapper;
    public AdminController(ProductService productService, UserRepository userRepository, OrderRepository orderRepository, CommentRepository commentRepository, TransactionRepository transactionRepository, UserService userService) {
        this.productService = productService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.commentRepository = commentRepository;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
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
        return ResponseEntity.ok(userService.putOrder(id,status));

    }
}
