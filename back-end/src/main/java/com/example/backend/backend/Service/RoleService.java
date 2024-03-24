package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.ERole;
import com.example.backend.backend.Entity.Role;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Entity.UserRole;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Optional<Role> getByName(ERole name);
    List<UserRole> getByUser(User user);
    void createRole();
}
