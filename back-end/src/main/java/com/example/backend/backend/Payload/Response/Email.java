package com.example.backend.backend.Payload.Response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Email{
    private Message message =new Message();
    private boolean saveToSentItems;


    @Data
    public static class Message {
        private String subject;
        private Body body;
        private List<Recipient> toRecipients= new ArrayList<Recipient>();


    }
    @Data
    public static class Body {
        private String contentType;
        private String content;
    }

    @Data
    public static class Recipient {
        private EmailAddress emailAddress= new EmailAddress();

    }
    @Data
    public static class EmailAddress {
        private String address;

    }
}
