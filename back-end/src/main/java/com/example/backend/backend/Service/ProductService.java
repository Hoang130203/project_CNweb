package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Payload.Product.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Product save(Product product);
    List<Product> getAllProducts();
    List<Product> getNewest();
    List<Product> getProductByType(EType type);
    Product getProduct(int id);
    Rate getRate(int productId,String userId);
    Rate postRate(int productId,String userId,int rate);
    Comment postComment(String userId, CommentReq commentReq);
    List<Comment> getComments(String userId,int productId);
    Product createProduct(ProductCreateReq productCreateReq);
    List<Size> getAllSize();
    Product putBaseInfo(InfoProduct infoProduct);
    List<ProductQuantity> putQuantity(ProductQuantityChange productQuantityChange);
    List<ProductImage> putImages(ImageChangeReq imageChangeReq);
    Page<Product> findAllByKeyword(String keyword, Pageable pageable);
    long countOrdersToday();
    Long totalCostToday();
    long countOrdersThisWeek();
    Long totalCostThisWeek();
    List<Object[]> findallCostMonth(int  month);
}
