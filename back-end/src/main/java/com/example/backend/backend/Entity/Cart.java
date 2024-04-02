package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.CartKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@IdClass(CartKey.class)
public class Cart {
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

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "cost")
    private Long cost;
}
