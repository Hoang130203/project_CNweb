package com.example.backend.backend.Payload.Cart;

import lombok.Data;

@Data
public class PostCart {
    private int productId;
    private int colorId;
    private int sizeId;
    private int quantity;
    private Long cost;

}
