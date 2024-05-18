package com.example.backend.backend.Payload.Response;

import com.example.backend.backend.Entity.Transaction;
import lombok.Data;

import java.util.List;

@Data
public class UserInfoToAdmin {
    private String name;
    private String avatar;
    private String email;
    private String address;
    private String phone;
    private Long paid;

}
