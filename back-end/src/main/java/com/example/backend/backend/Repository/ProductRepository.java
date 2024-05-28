package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

//tạo repository kế thừa từ JpaRepository cho lớp Product để có sẵn nhiều phương thức liên quan tới CRUD và
//khai báo thêm các phương thức khác
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query("SELECT p FROM Product p where p.hidden = false ORDER BY p.id desc ")
    List<Product> findTop12Product(Pageable pageable);

    @Query("select  p from Product p where p.hidden=false and p.type=:type")
    List<Product> findProductByType(EType type);

    Page<Product> findAllByNameContainingIgnoreCase(String keyword, Pageable pageable);

}
