package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "total_cost")
    private Long totalCost;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private EStatus status;

    @Column(name = "delivery_cost")
    private Long deliveryCost;

    @Column(name = "payments")
    private boolean payments;//0 là online, 1 là offline

    @Column(name = "payment_status")
    private boolean paymentStatus;//0 là chưa trả , 1 là đã trả

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "order")
    private List<ProductOrder> products = new ArrayList<>();
}
