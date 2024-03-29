package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.ERole;
import com.example.backend.backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//Đinh nghĩa giao diện RoleRespository mở rộng từ JpaRepository
public interface RoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(ERole name);
}
