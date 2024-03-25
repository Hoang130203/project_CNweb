package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private String id;

    @Column(name = "num_order")
    private int numOrder;

    @Column(name = "content",columnDefinition = "nvarchar(max)")
    private String content;

    @Column(name = "image",columnDefinition = "varchar(max)")
    private String image;

    @Column(name = "owner")
    private boolean owner;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
}
