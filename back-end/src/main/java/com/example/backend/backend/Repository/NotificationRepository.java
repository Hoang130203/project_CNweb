package com.example.backend.backend.Repository;

import com.example.backend.backend.Entity.Notification;
import com.example.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    List<Notification> findAllByUser(User user);
    @Query("SELECT n FROM Notification n WHERE n.isAdmin = true")
    List<Notification> findAllAdminNotifications();}
