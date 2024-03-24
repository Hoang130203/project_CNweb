package com.example.backend.backend.Service;



import com.example.backend.backend.Entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getByAccount(String account);
    Optional<User> getById(String id);
    boolean existByAccount(String account);
    void save(User user);
}
