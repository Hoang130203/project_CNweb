package com.example.backend.backend.Payload.Request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProviderRegister {
    String id;
    String avatar;
    String name;
    String email;
    boolean hasProvider;
}
