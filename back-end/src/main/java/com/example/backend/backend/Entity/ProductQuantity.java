package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.ProductQuantityKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_quantity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@IdClass(ProductQuantityKey.class)
public class ProductQuantity {
    @Id
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @Id
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    @Id
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @Column(name = "quantity")
    private int quantity;

}
