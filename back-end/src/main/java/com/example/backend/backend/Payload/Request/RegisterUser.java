package com.example.backend.backend.Payload.Request;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class RegisterUser {
    private String account;
    private String password;
    private String email;
    private String name;
    private Set<String> roles=new HashSet<>();
}
