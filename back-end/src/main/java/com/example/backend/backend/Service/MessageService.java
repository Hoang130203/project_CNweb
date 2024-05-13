package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Message;
import com.example.backend.backend.Entity.User;

import java.util.List;

public interface MessageService {
    List<Message> getAllByUser(String userId);
    List<Message> getAll();
    Message insert(Message message,String account);
    List<Message> getAllByTopic(String topicId);
}
