package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByAccount(String account);
    boolean existsByAccount(String account);
}
