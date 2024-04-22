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

//api liên quan tới sản phẩm
@RestController
//path gốc của api
@RequestMapping("/api/product")
public class ProductController {
    //tiêm các service cần dùng vào
    private final ProductService productService;
    private final SizeService sizeService;
    private final ColorService colorService;
    private final UserService userService;
    @Autowired
    private ModelMapper modelMapper;//đối tượng chuyển hóa dữ liệu cho các đối tượng của các lớp khác nhau

    @Autowired
    //Khởi tạo đối tượng controller và tiêm các service
    public ProductController(ProductService productService, SizeService sizeService, ColorService colorService, UserService userService) {
        this.productService = productService;
        this.sizeService = sizeService;
        this.colorService = colorService;
        this.userService = userService;

    }
    @GetMapping
    //lấy tất cả sản phẩm trong csdl và chuyển thành đối tượng lớp BaseInfoProudct
    public List<BaseInfoProduct> getAllProducts() {
        return productService.getAllProducts().stream().map(product -> modelMapper.map(product, BaseInfoProduct.class))
                .collect(Collectors.toList());
    }
    //Lấy top những sản phẩm mới nhất
    @GetMapping("/TopNewest")
    public List<BaseInfoProduct> getNewest(){
        return productService.getNewest().stream().map(product -> modelMapper.map(product,BaseInfoProduct.class))
                .collect(Collectors.toList());
    }
    //lấy những sản phẩm được lọc theo loại sản phẩm
    @GetMapping("/filter")
    public List<BaseInfoProduct> getByType(@RequestParam("type")EType type){
        return productService.getProductByType(type).stream().map(product -> modelMapper.map(product,BaseInfoProduct.class))
                .collect(Collectors.toList());
    }

    //lấy sản phẩm chi tiết theo id sản phẩm
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

    //đánh giá sản phẩm, mỗi người dùng chỉ có 1 lần đánh giá 1 sản phẩm, nếu đánh giá mới
    //thì thay thế đánh giá cũ bằng đánh giá mới
    @PostMapping("/rate")
    public ResponseEntity<?> postRate(@RequestBody RateReq rateReq)
    {
        //lấy thông tin người dùng gửi request
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        productService.postRate(rateReq.getProductId(),getUserId(userDetails),rateReq.getRate());
        return ResponseEntity.ok(new Message("send"));
    }

    //lấy đánh giá của người dùng đối với 1 sản phẩm
    @GetMapping("/rate")
    public ResponseEntity<?> getRate(@RequestParam("productId") int productId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(modelMapper.map(productService.getRate(productId,getUserId(userDetails)),RateReq.class));
    }

    //lấy các comment của người dùng đối với 1 sản phẩm
    @GetMapping("/comment")
    public ResponseEntity<?> getComments(@RequestParam("productId") int productId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(productService.getComments(getUserId(userDetails),productId).stream().map(comment -> modelMapper.map(comment,CommentReq.class)));
    }

    //gửi comment , một người dùng có thể comment 1 sản phẩm nhiều lần
    @PostMapping("/comment")
    public ResponseEntity<?> postMappings(@RequestBody CommentReq commentReq){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Comment comment = productService.postComment(getUserId(userDetails),commentReq);
        return comment!=null?ResponseEntity.ok(modelMapper.map(comment,CommentReq.class)):ResponseEntity.ok("Error");

    }

    //lấy id người dùng từ request(vì áp dụng cơ chế bảo mật nên request chỉ nhận token thay vì các thông tin khác)
    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
