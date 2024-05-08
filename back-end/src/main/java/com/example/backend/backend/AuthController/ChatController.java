package com.example.backend.backend.AuthController;

import com.example.backend.backend.Payload.Response.ChatMessage;
import com.example.backend.backend.Websocket.ChatRoomManager;
import com.example.backend.backend.Websocket.WebSocketEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.security.Principal;
import java.util.Date;

@RestController
@CrossOrigin
public class ChatController {
//    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ChatRoomManager chatRoomManager;

//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public ChatMessage sendMessages(@Payload ChatMessage chatMessage){
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
//                .getPrincipal();
//        if(userDetails.getUsername().equals(null)){
//            System.out.println("null");
//        }
//        System.out.println(userDetails.getUsername()+"abc abc");
//        chatMessage.setTimestamp(new Date());
//        return chatMessage;
//    }
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessages(@Payload ChatMessage chatMessage, Principal principal) {
        String username = null;
        if (principal instanceof UsernamePasswordAuthenticationToken) {
            Authentication authentication = (Authentication) principal;
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            username = userDetails.getUsername();
        } else if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            username = userDetails.getUsername();
        }
        System.out.println(username);
        chatMessage.setTimestamp(new Date());
        messagingTemplate.convertAndSend("/topic/" + username, chatMessage);

        return chatMessage;
    }

    @GetMapping("/api/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("abc");
    }

    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/messages/{roomId}")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage, @DestinationVariable String roomId) {
        return chatMessage;
    }


    @MessageMapping("/chat/{roomId}/addUser")
    public void addUser(@DestinationVariable String roomId, @Payload ChatMessage chatMessage,
                        SimpMessageHeaderAccessor headerAccessor) {
        String username = chatMessage.getSender();
        chatRoomManager.addUserToRoom(roomId, username);
        headerAccessor.getSessionAttributes().put("username", username);
        headerAccessor.getSessionAttributes().put("room_id", roomId);
    }
}

