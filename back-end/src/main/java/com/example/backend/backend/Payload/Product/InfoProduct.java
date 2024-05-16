package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.Enum_Key.EType;
import lombok.Data;

@Data
//dùng cho admin khi thay đổi những thông tin cơ bản của sản phẩm
public class InfoProduct {
    private int id;
    private String name;
    private EType type;
    private String description;
    private String origin;
    private String brand;
    private Long cost;
    private int promotion;
}
