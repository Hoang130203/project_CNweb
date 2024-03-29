package com.example.backend.backend.Service;


import com.example.backend.backend.Entity.Enum_Key.ERole;
import com.example.backend.backend.Entity.Role;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Entity.UserRole;
import com.example.backend.backend.Repository.RoleRepository;
import com.example.backend.backend.Repository.UserRoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }


    @Override
    public Optional<Role> getByName(ERole name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<UserRole> getByUser(User user) {
        return userRoleRepository.getUserRole(user);
    }

    @Override
    public void createRole() {
        Role roleUser= new Role();
        Role roleAdmin= new Role();
        roleUser.setName(ERole.ROLE_USER);
        roleUser.setId(1);
        roleAdmin.setName(ERole.ROLE_ADMIN);
        roleAdmin.setId(2);
        roleRepository.save(roleUser);
        roleRepository.save(roleAdmin);
    }
}
