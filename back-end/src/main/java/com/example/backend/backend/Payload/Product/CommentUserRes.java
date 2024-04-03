package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.User;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class CommentUserRes implements Serializable {
    private String name;
    private String avatar;
    private String content;
    private String picture;
    private Timestamp time;
    public CommentUserRes() {}

    public CommentUserRes(User user) {
        this.name = user.getName();
        this.avatar = user.getAvatar();
    }
}
