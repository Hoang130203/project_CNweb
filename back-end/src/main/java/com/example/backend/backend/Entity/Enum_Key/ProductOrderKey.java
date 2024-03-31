package com.example.backend.backend.Entity.Enum_Key;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Order;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Size;
import lombok.Data;

import java.io.Serializable;

@Data
public class ProductOrderKey implements Serializable {
    private Product product;
    private Size size;
    private Color color;
    private Order order;

}
