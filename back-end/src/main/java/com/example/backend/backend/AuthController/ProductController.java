package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Payload.Product.BaseInfoProduct;
import com.example.backend.backend.Payload.Product.DetailInfoProduct;
import com.example.backend.backend.Service.ColorService;
import com.example.backend.backend.Service.ProductService;
import com.example.backend.backend.Service.SizeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;
    private final SizeService sizeService;
    private final ColorService colorService;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public ProductController(ProductService productService, SizeService sizeService, ColorService colorService) {
        this.productService = productService;
        this.sizeService = sizeService;
        this.colorService = colorService;
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
        return ResponseEntity.ok(modelMapper.map(productService.getProduct(id), DetailInfoProduct.class));
    }
    @GetMapping("/createsizeandcolor")
    public void createSizesFromEnum() {
        sizeService.createSizesFromEnum();
        colorService.createColorsFromEnum();
    }

}
