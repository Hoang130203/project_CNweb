package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Message;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Response.ChatMessage;
import com.example.backend.backend.Service.MessageService;
import com.example.backend.backend.Service.UserService;
import com.example.backend.backend.Websocket.ChatRoomManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Optional;

@RestController
@CrossOrigin
public class ChatController {
//    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final UserService userService;
    private final MessageService messageService;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ChatRoomManager chatRoomManager;

    public ChatController(UserService userService, MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

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

    @GetMapping("/oldMessage")
    public ResponseEntity<?> getOldMessageForUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(messageService.getAllByUser(getUserId(userDetails)));
    }
    @GetMapping("/oldMessageAdmin")
    public ResponseEntity<?> getOldMessageAdmin(){
        return ResponseEntity.ok(messageService.getAll());
    }

    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
    public ChatMessage sendMessages(@Payload ChatMessage chatMessage, Principal principal) {
        String username = null;
        boolean isAdmin=false;
        User user = new User();
        if (principal instanceof UsernamePasswordAuthenticationToken) {
            Authentication authentication = (Authentication) principal;
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            user= getUserInfo(userDetails);
            chatMessage.setName(user.getName());
            chatMessage.setAvatar(user.getAvatar());
            for (GrantedAuthority authority : userDetails.getAuthorities()) {
                // Kiểm tra xem có role "admin" không
                if (authority.getAuthority().equals("ROLE_ADMIN")) {
                    isAdmin=true;
                    chatMessage.setAdmin(true);
                    System.out.println("dasfjsdlf");

                }
            }
            username = userDetails.getUsername();
        } else if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            user= getUserInfo(userDetails);
            chatMessage.setName(user.getName());
            chatMessage.setAvatar(user.getAvatar());
            for (GrantedAuthority authority : userDetails.getAuthorities()) {
                // Kiểm tra xem có role "admin" không
                if (authority.getAuthority().equals("ROLE_ADMIN")) {
                    isAdmin=true;
                    chatMessage.setAdmin(true);
                    System.out.println("dasfjsdlf");

                }
            }
            username = userDetails.getUsername();
        }
        System.out.println(username);
        chatMessage.setSender(username);
        chatMessage.setTimestamp(new Timestamp(System.currentTimeMillis()));

        if(chatMessage.isAdmin()){
            messagingTemplate.convertAndSend("/topic-admin", chatMessage);
            messagingTemplate.convertAndSend(String.format("/topic/%s", chatMessage.getTopic()), chatMessage);
            System.out.println(chatMessage.getTopic());
        }else{
            messagingTemplate.convertAndSend("/topic-admin", chatMessage);
            messagingTemplate.convertAndSend(String.format("/topic/%s", username), chatMessage);
        }
        Message message = new Message(chatMessage.getContent(),chatMessage.getImage(),isAdmin?true:false,chatMessage.getTimestamp(),isAdmin?chatMessage.getTopic():username);
        messageService.insert(message,chatMessage.getTopic());
        return chatMessage;
    }

    @GetMapping("/api/userId")
    public ResponseEntity<?> test(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return ResponseEntity.ok(userDetails.getUsername());
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
    //lấy ra id người dùng
    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
    //lấy ra info người dùng
    public User getUserInfo(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get();
    }
}

