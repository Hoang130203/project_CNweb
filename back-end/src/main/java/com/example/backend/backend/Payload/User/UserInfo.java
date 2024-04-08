package com.example.backend.backend.Payload.User;

import com.example.backend.backend.Entity.UserRole;
import lombok.Data;

import java.util.List;

@Data
public class UserInfo {
    private String name;
    private String avatar;
    private String email;
//    private String password;
    private String address;
    private String phone;
    private List<UserRole> roles;

}
