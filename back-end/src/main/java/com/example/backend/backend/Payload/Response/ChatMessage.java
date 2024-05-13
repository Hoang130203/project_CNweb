package com.example.backend.backend.Payload.Response;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ChatMessage {
    private String topic;
    private String content;
    private Timestamp timestamp;
    private String sender;
    private String name;
    private String avatar;
    private String image;
    @Getter @Setter
    private boolean isAdmin;

    final private String type="MESSAGE";
}
