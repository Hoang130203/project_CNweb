package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Comment;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment> findCommentsByUserAndProduct(User user, Product product);
}
