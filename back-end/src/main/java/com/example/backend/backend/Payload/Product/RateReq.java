package com.example.backend.backend.Payload.Product;

import lombok.Data;

@Data
public class RateReq {
    private int productId;
    private int rate;
}
