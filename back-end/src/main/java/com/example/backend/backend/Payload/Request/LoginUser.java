package com.example.backend.backend.Payload.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//lớp chứa thông tin đăng nhập
public class LoginUser {
    private String account;
    private String password;
}
