package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Order;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

//tạo repository kế thừa từ JpaRepository cho lớp Order để có sẵn nhiều phương thức liên quan tới CRUD
public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("SELECT COUNT(DISTINCT e.user) FROM Order e")
    long countDistinctValues();

    @Query("SELECT COUNT(o) FROM Order o WHERE o.time BETWEEN :startOfDay AND :endOfDay")
    long countOrdersToday(@Param("startOfDay") Timestamp startOfDay, @Param("endOfDay") Timestamp endOfDay);

    @Query("SELECT SUM(o.totalCost) FROM Order o WHERE o.time BETWEEN :startOfDay AND :endOfDay")
    Long getTotalCostToday(@Param("startOfDay") Timestamp startOfDay, @Param("endOfDay") Timestamp endOfDay);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.time BETWEEN :startOfWeek AND :endOfDay")
    long countOrdersThisWeek(@Param("startOfWeek") Timestamp startOfWeek, @Param("endOfDay") Timestamp endOfDay);

    @Query("SELECT SUM(o.totalCost) FROM Order o WHERE o.time BETWEEN :startOfWeek AND :endOfDay")
    Long getTotalCostLast7Days(@Param("startOfWeek") Timestamp startOfWeek, @Param("endOfDay") Timestamp endOfDay);
}
