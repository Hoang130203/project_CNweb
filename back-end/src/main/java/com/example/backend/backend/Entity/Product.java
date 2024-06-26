package com.example.backend.backend.Entity;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name",columnDefinition = "text")
    private String name;

    @Column(name = "origin",columnDefinition = "text")
    private String origin;

    @Column(name = "description",columnDefinition = "text")
    private String description;

    @Column(name = "cost")
    private Long cost;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EType type;

    @Column(name = "brand",columnDefinition = "text")
    private String brand;

    @JsonIgnore
    @Column(name = "sale_count")
    private int saleCount=0;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "product_size",joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "size_id"}))
    private List<Size> sizes;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "product_color",joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "color_id"}))
    private List<Color> colors;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    private List<ProductImage> images= new ArrayList<>();

    @Column
    private int promotion=0;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "product")
    private List<Comment> comments= new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "product")
    private List<Rate> rates= new ArrayList<>();

    @Column(name = "rates")
    private float rate=0.0f;
    @Column
    private int rateCount=0;

    @Column
    @Getter@Setter
    private boolean hidden=false;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "product")
    private List<ProductQuantity> productQuantities;
}
