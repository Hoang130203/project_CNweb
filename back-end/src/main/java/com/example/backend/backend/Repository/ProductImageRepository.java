package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    void deleteAllByProduct(Product product);
}
