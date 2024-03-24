package com.example.backend.backend.Entity;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserRoleKey implements Serializable {
    private User user;
    private Role role;

    // constructors, getters, setters, equals, hashCode, etc.
}