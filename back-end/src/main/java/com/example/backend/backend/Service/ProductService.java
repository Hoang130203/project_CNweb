package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;

import java.util.List;

public interface ProductService {
    Product save(Product product);
    List<Product> getAllProducts();
    List<Product> getNewest();
    List<Product> getProductByType(EType type);
    Product getProduct(int id);
}
