package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.ProductOrderKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@IdClass(ProductOrderKey.class)
public class ProductOrder {
    @Id
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    @Id
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @JsonIgnore
    @Id
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "cost")
    private Long cost;
}
