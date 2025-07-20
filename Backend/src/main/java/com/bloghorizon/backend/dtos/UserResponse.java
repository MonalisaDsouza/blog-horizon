package com.bloghorizon.backend.dtos;

import com.bloghorizon.backend.entities.User;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String name;
    private String username;
    private String email;
    private String bio;
    private String website;
    private String location;
    private LocalDate birthday;
    private boolean completedSignup;

    // Custom constructor to map from User entity
    public UserResponse(User user) {
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.website = user.getWebsite();
        this.location = user.getLocation();
        this.birthday = user.getBirthday();
        this.completedSignup = user.isCompletedSignup();
    }
}

