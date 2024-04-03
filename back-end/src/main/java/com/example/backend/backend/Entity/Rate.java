package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.RateKey;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@IdClass(RateKey.class)
public class Rate {
    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "rate")
    private int rate;
}
