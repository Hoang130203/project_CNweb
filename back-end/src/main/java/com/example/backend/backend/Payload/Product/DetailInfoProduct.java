package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Entity.Enum_Key.EType;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DetailInfoProduct {
    private int id;
    private EType type;
    private String description;
    private String origin;
    private String name;
    private List<Size> sizes;
    private List<Color> colors;
    private List<ProductImage> images= new ArrayList<>();
    private Promotion promotion;
    private List<Comment> comments= new ArrayList<>();
    private List<Rate> rates= new ArrayList<>();

}
