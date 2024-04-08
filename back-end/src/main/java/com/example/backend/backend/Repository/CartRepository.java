package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Cart;
import com.example.backend.backend.Entity.Enum_Key.CartKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//tạo repository kế thừa từ JpaRepository cho lớp Cart để có sẵn nhiều phương thức liên quan tới CRUD
public interface CartRepository extends JpaRepository<Cart, CartKey> {
//    @Query("delete Cart c where c.product=:product and c.")
}
