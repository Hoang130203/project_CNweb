package com.example.backend.backend.Payload.Dashboard;

import lombok.Data;

@Data
public class DashQuantity {
    private Long total;
    private int number;

    public DashQuantity(Long totalCostToday, long countOrdersToday) {
        this.total=totalCostToday;
        this.number=(int)countOrdersToday;
    }
}
