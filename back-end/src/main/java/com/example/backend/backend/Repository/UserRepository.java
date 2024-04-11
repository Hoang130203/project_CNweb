package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//tạo repository kế thừa từ JpaRepository cho lớp User để có sẵn nhiều phương thức liên quan tới CRUD
//và mở rộng thêm 1 số phương thức khác
public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByAccount(String account);
    boolean existsByAccount(String account);
    List<User> getAllByEmail (String email);
}
