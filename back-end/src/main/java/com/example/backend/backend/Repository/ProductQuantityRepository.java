package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.ProductQuantityKey;
import com.example.backend.backend.Entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, ProductQuantityKey> {

}
