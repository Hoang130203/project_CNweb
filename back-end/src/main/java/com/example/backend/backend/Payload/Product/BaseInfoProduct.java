package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.ProductImage;
import lombok.Data;

import java.util.List;

@Data
//Thông tin cơ bản của sản phẩm dùng khi gửi nhiều sản phẩm và không yêu cầu chi tiết thông tin
//nhằm giảm tải dữ liệu gửi đi
public class BaseInfoProduct {
    private int id;
    private String name;
    private String cost;
    private List<ProductImage> images;
    private String promotion;
}
