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
    //Khai báo các repository cần thiết
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }


    //Lấy role bằng ENum
    @Override
    public Optional<Role> getByName(ERole name) {
        return roleRepository.findByName(name);
    }

    //lấy ra danh sách các role của người dùng
    @Override
    public List<UserRole> getByUser(User user) {
        return userRoleRepository.getUserRole(user);
    }

    //tạo các role(dùng 1 lần khi khởi tạo csdl)
    @Override
    public void createRole() {
        Role roleUser= new Role();
        Role roleAdmin= new Role();
        Role roleStaff= new Role();
        Role roleShipper= new Role();
        roleUser.setName(ERole.ROLE_USER);
        roleUser.setId(1);
        roleAdmin.setName(ERole.ROLE_ADMIN);
        roleAdmin.setId(2);
        roleStaff.setName(ERole.ROLE_STAFF);
        roleStaff.setId(3);
        roleShipper.setName(ERole.ROLE_SHIPPER);
        roleShipper.setId(4);
        roleRepository.save(roleUser);
        roleRepository.save(roleAdmin);
        roleRepository.save(roleStaff);
        roleRepository.save(roleShipper);
    }
}
