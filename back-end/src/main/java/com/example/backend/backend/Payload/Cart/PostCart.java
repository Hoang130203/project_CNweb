package com.example.backend.backend.Payload.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//thông tin sản phẩm trong giỏ hàng khi người dùng gửi request lên
public class PostCart {
    private int productId;
    private int colorId;
    private int sizeId;
    private int quantity;
    private Long cost;

}
