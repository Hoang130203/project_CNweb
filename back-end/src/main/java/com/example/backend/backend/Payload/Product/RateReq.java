package com.example.backend.backend.Payload.Product;

import lombok.Data;

@Data
//chứa thông tin khi người dùng đánh giá số sao sản phẩm
public class RateReq {
    private int productId;
    private int rate;
}
