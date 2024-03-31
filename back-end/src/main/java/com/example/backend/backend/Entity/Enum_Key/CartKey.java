package com.example.backend.backend.Entity.Enum_Key;

import com.example.backend.backend.Entity.Color;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Size;
import com.example.backend.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartKey implements Serializable {
    private Product product;
    private Color color;
    private Size size;
    private User user;
}
