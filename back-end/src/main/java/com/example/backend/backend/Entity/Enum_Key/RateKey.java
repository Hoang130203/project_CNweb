package com.example.backend.backend.Entity.Enum_Key;

import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RateKey implements Serializable {
    private Product product;
    private User user;
}
