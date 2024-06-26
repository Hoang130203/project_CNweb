package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.RateKey;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//tạo repository kế thừa từ JpaRepository cho lớp Rate để có sẵn nhiều phương thức liên quan tới CRUD
public interface RateRepository extends JpaRepository<Rate, RateKey> {
    List<Rate> findAllByProduct(Product product);
}
