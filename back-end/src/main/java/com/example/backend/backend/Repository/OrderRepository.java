package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Order;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//tạo repository kế thừa từ JpaRepository cho lớp Order để có sẵn nhiều phương thức liên quan tới CRUD
public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("SELECT COUNT(DISTINCT e.user) FROM Order e")
    long countDistinctValues();
}
