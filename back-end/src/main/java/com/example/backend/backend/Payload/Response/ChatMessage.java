package com.example.backend.backend.Payload.Response;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ChatMessage {
    private String topic;
    private String content;
    private Date timestamp;
    private String sender;
    @Getter @Setter
    private boolean isAdmin;
}
