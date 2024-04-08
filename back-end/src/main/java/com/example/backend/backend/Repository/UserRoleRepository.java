package com.example.backend.backend.Repository;


import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Entity.UserRole;
import com.example.backend.backend.Entity.UserRoleKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//tạo repository kế thừa từ JpaRepository cho lớp UserRole để có sẵn nhiều phương thức liên quan tới CRUD
//và mở rộng thêm 1 số phương thức khác bằng query db
public interface UserRoleRepository  extends  JpaRepository<UserRole, UserRoleKey> {
    @Query("select ur from UserRole ur where ur.user=:user")
    List<UserRole> getUserRole(@Param("user") User user);
}
