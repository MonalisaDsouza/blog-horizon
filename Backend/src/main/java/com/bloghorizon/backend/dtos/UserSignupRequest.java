package com.bloghorizon.backend.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequest {

    private String auth0UserId;
    private String email;
    private String username;
}

