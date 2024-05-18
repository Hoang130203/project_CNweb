package com.example.backend.backend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_money")
    private Long money;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "time",columnDefinition = "datetime")
    private Timestamp time;

    @Column(name = "status")
    private String status;

    @Column(name = "order_id")
    private int orderId;

    public Transaction(Long money, User user, Timestamp time, String status,int OrderId) {
        this.money = money;
        this.user = user;
        this.time = time;
        this.status = status;
        this.orderId=OrderId;
    }
}