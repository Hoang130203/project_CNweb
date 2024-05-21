package com.example.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "notification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "datetime")
    private Date date;

    @Column(columnDefinition = "nvarchar(max)")
    private String content;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private int orderId;
    @Getter
    @Setter
    private boolean isAdmin;
    @Getter@Setter
    private boolean idRead;

    public Notification(Date date, String content, User user, int orderId, boolean isAdmin, boolean idRead) {
        this.date = date;
        this.content = content;
        this.user = user;
        this.orderId = orderId;
        this.isAdmin = isAdmin;
        this.idRead = idRead;
    }
}
