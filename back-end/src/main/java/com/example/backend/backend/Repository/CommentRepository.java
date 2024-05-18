package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Comment;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

//tạo repository kế thừa từ JpaRepository cho lớp Comment để có sẵn nhiều phương thức liên quan tới CRUD
public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment> findCommentsByUserAndProduct(User user, Product product);
    long count();
}
