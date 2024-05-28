package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface ProductOrderRepository extends JpaRepository<ProductOrder,Long> {
    @Query("SELECT po.product.type, SUM(po.cost*po.quantity) FROM ProductOrder po " +
            "JOIN po.product p " +
            "JOIN po.order o " +
            "WHERE o.time BETWEEN :startDate AND :endDate " +
            "GROUP BY po.product.type")
    List<Object[]> findTotalCostOfMobileProductsLast6Months(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    @Query("update ProductOrder po set po.product=null where po.product=:product ")
    void deleteProductOrders(@Param("product") Product product);
}
