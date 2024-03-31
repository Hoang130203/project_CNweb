package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer> {
}
