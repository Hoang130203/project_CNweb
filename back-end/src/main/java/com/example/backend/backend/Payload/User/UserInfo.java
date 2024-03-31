package com.example.backend.backend.Payload.User;

import lombok.Data;

@Data
public class UserInfo {
    private String name;
    private String avatar;
    private String email;
//    private String password;
    private String address;
    private String phone;

}
