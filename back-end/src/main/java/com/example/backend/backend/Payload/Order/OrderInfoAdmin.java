package com.example.backend.backend.Payload.Order;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Entity.ProductOrder;
import com.example.backend.backend.Entity.User;
import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
public class OrderInfoAdmin {
    private int id;
    private Long totalCost;
    private EStatus status;
    private Long deliveryCost;
    private boolean payments;
    private boolean paymentStatus;
    private Timestamp time;
    private User user;
    private List<ProductOrder> products = new ArrayList<>();
}
