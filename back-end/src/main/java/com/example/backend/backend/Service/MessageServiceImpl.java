package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Message;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Repository.MessageRepository;
import com.example.backend.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MessageServiceImpl implements MessageService{
    private  final MessageRepository messageRepository;
    private final UserRepository userRepository;
    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Message> getAllByUser(String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("user not found"));
        return messageRepository.findAllByUser(user);
    }

    @Override
    public List<Message> getAll() {
        return messageRepository.findAll();
    }

    @Override
    public Message insert(Message message,String account) {
        User user= userRepository.findByAccount(account)
                .orElseThrow(()->new RuntimeException("user not found"));
        message.setUser(user);
        message.setNumOrder();

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getAllByTopic(String topicId) {
        User user= userRepository.findByAccount(topicId)
                .orElseThrow(()->new RuntimeException("user not found"));

        return messageRepository.findAllByUser(user);
    }
}
