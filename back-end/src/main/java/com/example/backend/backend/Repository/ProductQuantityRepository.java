package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.ProductQuantityKey;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//tạo repository kế thừa từ JpaRepository cho lớp ProductQuantity để có sẵn nhiều phương thức liên quan tới CRUD
public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, ProductQuantityKey> {
    List<ProductQuantity> findAllByProduct(Product product);
}
