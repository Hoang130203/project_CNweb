package com.example.backend.backend.Payload.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostCart {
    private int productId;
    private int colorId;
    private int sizeId;
    private int quantity;
    private Long cost;

}
