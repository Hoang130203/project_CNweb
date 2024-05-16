package com.example.backend.backend.Payload.Product;

import com.example.backend.backend.Entity.ProductImage;
import lombok.Data;

import java.util.List;

@Data
public class ImageChangeReq {
    private List<ProductImage> productImagesDelete;
    private List<ProductImage> newProductImages;
    private int productId;
}
