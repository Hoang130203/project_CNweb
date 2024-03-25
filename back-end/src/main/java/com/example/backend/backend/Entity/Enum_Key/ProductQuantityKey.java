package com.example.backend.backend.Entity.Enum_Key;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Getter
@Setter
public class ProductQuantityKey implements Serializable {
    private Product product;
    private Color color;
    private Size size;
}
