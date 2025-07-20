package com.bloghorizon.backend.utils;

import com.bloghorizon.backend.entities.User;
import com.bloghorizon.backend.dtos.UserResponse;

public class UserMapper {

    public static UserResponse toUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setName(user.getName());
        response.setUsername(user.getUsername());
        response.setBio(user.getBio());
        response.setWebsite(user.getWebsite());
        response.setLocation(user.getLocation());
        response.setBirthday(user.getBirthday());
        response.setCompletedSignup(user.isCompletedSignup());
        return response;
    }
}
