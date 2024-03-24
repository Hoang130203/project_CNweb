package com.example.backend.backend.Repository;


import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Entity.UserRole;
import com.example.backend.backend.Entity.UserRoleKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRoleRepository  extends  JpaRepository<UserRole, UserRoleKey> {
    @Query("select ur from UserRole ur where ur.user=:user")
    List<UserRole> getUserRole(@Param("user") User user);
}
