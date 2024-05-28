package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

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

    @Column(name = "content",columnDefinition = "text")
    private String content;

    @Column(name = "image",columnDefinition = "text")
    private String image;

    @Column(name = "owner")
    private boolean owner;

    @Column(name = "time")
    private Timestamp time;

    @Column(name = "topic")
    private String topic;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void setNumOrder() {
        this.numOrder = this.user.getMessageCount() + 1;
        this.user.setMessageCount(this.numOrder);
    }

    public Message(String content, String image, boolean owner, Timestamp time, String topic) {
        this.content = content;
        this.image = image;
        this.owner = owner;
        this.time = time;
        this.topic = topic;
    }
}
