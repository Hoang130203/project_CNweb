package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.ProductQuantity;
import lombok.Data;

import java.util.List;

@Data
public class ProductQuantityChange {
    private List<ProductQuantity> oldListProductQuantitiy;
    private List<ProductQuantity> newListProductQuantity;
    private int productId;
}
