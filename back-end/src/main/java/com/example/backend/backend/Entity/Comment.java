package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Comment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "content",columnDefinition = "text")
    private String content;

    @Column(name = "picture",columnDefinition = "text")
    private String picture;

    @Column(name = "time")
    private Timestamp time;

    public Comment(Product product, User user, String content, String picture, Timestamp timestamp) {
        this.product=product;
        this.user=user;
        this.content=content;
        this.picture=picture;
        this.time=timestamp;
    }
}
