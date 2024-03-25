package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "url",columnDefinition = "varchar(max)")
    private String url;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
}
