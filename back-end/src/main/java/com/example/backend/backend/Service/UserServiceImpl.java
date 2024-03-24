package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public Optional<User> getByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existByAccount(String account) {
        return userRepository.existsByAccount(account);
    }

    @Override
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }
}
