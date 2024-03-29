package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query("SELECT p FROM Product p ORDER BY p.id desc ")
    List<Product> findTop12Product(Pageable pageable);

    List<Product> findProductByType(EType type);
}
