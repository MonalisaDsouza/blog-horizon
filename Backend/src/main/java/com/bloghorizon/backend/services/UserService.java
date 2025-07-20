package com.bloghorizon.backend.services;

import com.bloghorizon.backend.dtos.CompleteSignupRequest;
import com.bloghorizon.backend.dtos.SignupResponse;
import com.bloghorizon.backend.dtos.UserResponse;
import com.bloghorizon.backend.dtos.UserSignupRequest;
import com.bloghorizon.backend.responses.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<ApiResponse<SignupResponse>> signup(UserSignupRequest request);

    ResponseEntity<ApiResponse<UserResponse>> getUserDetails(String auth0UserId);

    ResponseEntity<ApiResponse<UserResponse>> completeSignup(String auth0UserId, CompleteSignupRequest request);

    ResponseEntity<ApiResponse<Boolean>> checkUsernameAvailability(String username);
}