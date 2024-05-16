package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.ProductQuantity;
import com.example.backend.backend.Payload.Product.*;
import com.example.backend.backend.Service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProductService productService;
    @Autowired
    private ModelMapper modelMapper;
    public AdminController(ProductService productService) {
        this.productService = productService;
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
}