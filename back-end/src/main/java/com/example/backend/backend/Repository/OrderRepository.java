package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

//tạo repository kế thừa từ JpaRepository cho lớp Order để có sẵn nhiều phương thức liên quan tới CRUD
public interface OrderRepository extends JpaRepository<Order,Integer> {
}
