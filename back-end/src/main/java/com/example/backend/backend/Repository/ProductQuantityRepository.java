package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.ProductQuantityKey;
import com.example.backend.backend.Entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
//tạo repository kế thừa từ JpaRepository cho lớp ProductQuantity để có sẵn nhiều phương thức liên quan tới CRUD
public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, ProductQuantityKey> {

}
