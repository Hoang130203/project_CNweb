package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.Product;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class CommentReq {
    private int productId;
    private String content;
    private String picture;
    private Timestamp time;
}
