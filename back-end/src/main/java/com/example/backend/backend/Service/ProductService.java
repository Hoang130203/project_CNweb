package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Comment;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Rate;
import com.example.backend.backend.Payload.Product.CommentReq;
import com.example.backend.backend.Payload.Product.ProductCreateReq;

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
}
