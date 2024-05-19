package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
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

    @Column(name = "time",columnDefinition = "datetime")
    private Timestamp time;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "order",fetch = FetchType.EAGER)
    private List<ProductOrder> products = new ArrayList<>();


}
