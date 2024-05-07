package com.example.backend.backend.AuthController;

import com.example.backend.backend.Payload.Response.ChatMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin
public class ChatController {
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessages(@Payload ChatMessage chatMessage){
        chatMessage.setTimestamp(new Date());
        return chatMessage;
    }
    @GetMapping("/api/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("abc");
    }
}

