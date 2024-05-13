package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Message;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,String> {
    List<Message> findAllByUser(User user);
}
