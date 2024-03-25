package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "color")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Color {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name",columnDefinition = "nvarchar(155)")
    private String name;

}
