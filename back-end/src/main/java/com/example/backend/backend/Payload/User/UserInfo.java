package com.example.backend.backend.Payload.User;

import com.example.backend.backend.Entity.UserRole;
import lombok.Data;

import java.util.List;

@Data
//lớp chứa thông tin người dùng gửi tới front-end để đảm bảo che dấu các thông tin quan trọng, giảm dữ liệu truyền tải
public class UserInfo {
    private String name;
    private String avatar;
    private String email;
//    private String password;
    private String address;
    private String phone;
    private List<UserRole> roles;

}
