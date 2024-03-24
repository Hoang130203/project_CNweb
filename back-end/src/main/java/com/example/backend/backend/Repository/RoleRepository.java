package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.ERole;
import com.example.backend.backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(ERole name);
}
