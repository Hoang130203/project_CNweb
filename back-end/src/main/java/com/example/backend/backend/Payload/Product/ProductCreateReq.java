package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.ProductImage;
import com.example.backend.backend.Entity.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductCreateReq {
    private EType type;
    private String description;
    private String origin;
    private String brand;
    private String name;
    private Long cost;
    private List<Size> sizes;
    private List<Color> colors;
    private List<ProductImage> images= new ArrayList<>();
    private int promotion;
}
