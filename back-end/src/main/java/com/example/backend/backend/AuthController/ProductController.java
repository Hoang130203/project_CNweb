package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Comment;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Product.*;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Service.ColorService;
import com.example.backend.backend.Service.ProductService;
import com.example.backend.backend.Service.SizeService;
import com.example.backend.backend.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;
    private final SizeService sizeService;
    private final ColorService colorService;
    private final UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public ProductController(ProductService productService, SizeService sizeService, ColorService colorService, UserService userService) {
        this.productService = productService;
        this.sizeService = sizeService;
        this.colorService = colorService;
        this.userService = userService;

    }
    @GetMapping
    public List<BaseInfoProduct> getAllPosts() {
        return productService.getAllProducts().stream().map(product -> modelMapper.map(product, BaseInfoProduct.class))
                .collect(Collectors.toList());
    }
    @GetMapping("/TopNewest")
    public List<BaseInfoProduct> getNewest(){
        return productService.getNewest().stream().map(product -> modelMapper.map(product,BaseInfoProduct.class))
                .collect(Collectors.toList());
    }
    @GetMapping("/filter")
    public List<BaseInfoProduct> getByType(@RequestParam("type")EType type){
        return productService.getProductByType(type).stream().map(product -> modelMapper.map(product,BaseInfoProduct.class))
                .collect(Collectors.toList());
    }
    @GetMapping("/detail")
    public ResponseEntity<?> getProductById(@RequestParam("id") int id)
    {
        Product product = productService.getProduct(id);
        DetailInfoProduct detailInfoProduct = modelMapper.map(product, DetailInfoProduct.class);

        // Map rates
        List<RateReq> rateDtos = product.getRates().stream()
                .map(rate -> modelMapper.map(rate, RateReq.class))
                .collect(Collectors.toList());
        detailInfoProduct.setRates(rateDtos);
        // Map comments
        List<?> commentDtos = product.getComments().stream()
                .map(comment ->  {
                    CommentUserRes commentUserRes = modelMapper.map(comment, CommentUserRes.class);
                    commentUserRes.setName(comment.getUser().getName());
                    commentUserRes.setAvatar(comment.getUser().getAvatar());
                    return commentUserRes;
                })
                .collect(Collectors.toList());
        detailInfoProduct.setComments(commentDtos);

        return ResponseEntity.ok(detailInfoProduct);
//        return ResponseEntity.ok(modelMapper.map(productService.getProduct(id), DetailInfoProduct.class));
    }

    @GetMapping("/createsizeandcolor")
    public void createSizesFromEnum() {
        sizeService.createSizesFromEnum();
        colorService.createColorsFromEnum();
    }

    @PostMapping("/rate")
    public ResponseEntity<?> postRate(@RequestBody RateReq rateReq)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        productService.postRate(rateReq.getProductId(),getUserId(userDetails),rateReq.getRate());
        return ResponseEntity.ok(new Message("send"));
    }

    @GetMapping("/rate")
    public ResponseEntity<?> getRate(@RequestParam("productId") int productId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(modelMapper.map(productService.getRate(productId,getUserId(userDetails)),RateReq.class));
    }
    @GetMapping("/comment")
    public ResponseEntity<?> getComments(@RequestParam("productId") int productId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(productService.getComments(getUserId(userDetails),productId).stream().map(comment -> modelMapper.map(comment,CommentReq.class)));
    }

    @PostMapping("/comment")
    public ResponseEntity<?> postMappings(@RequestBody CommentReq commentReq){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Comment comment = productService.postComment(getUserId(userDetails),commentReq);
        return comment!=null?ResponseEntity.ok(modelMapper.map(comment,CommentReq.class)):ResponseEntity.ok("Error");

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
