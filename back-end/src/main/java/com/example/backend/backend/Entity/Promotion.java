package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Promotion {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "percents")
    private int percent;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
