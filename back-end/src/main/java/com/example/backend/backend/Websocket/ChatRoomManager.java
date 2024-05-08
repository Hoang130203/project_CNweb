package com.example.backend.backend.Websocket;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class ChatRoomManager {
    private final Map<String, Set<String>> rooms = new HashMap<>();

    public void addUserToRoom(String roomId, String username) {
        rooms.computeIfAbsent(roomId, k -> new HashSet<>()).add(username);
    }

    public void removeUserFromRoom(String roomId, String username) {
        Set<String> users = rooms.get(roomId);
        if (users != null) {
            users.remove(username);
            if (users.isEmpty()) {
                rooms.remove(roomId);
            }
        }
    }

    public Set<String> getUsersInRoom(String roomId) {
        return rooms.getOrDefault(roomId, new HashSet<>());
    }
}