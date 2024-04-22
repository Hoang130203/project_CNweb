package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Enum_Key.ESize;
import com.example.backend.backend.Entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

//tạo repository kế thừa từ JpaRepository cho lớp Size để có sẵn nhiều phương thức liên quan tới CRUD
public interface SizeRepository extends JpaRepository<Size, Integer> {
    Size findByName(ESize name);
}
