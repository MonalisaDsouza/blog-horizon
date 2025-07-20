package com.bloghorizon.backend.services.impl;

import com.bloghorizon.backend.dtos.CompleteSignupRequest;
import com.bloghorizon.backend.dtos.SignupResponse;
import com.bloghorizon.backend.dtos.UserResponse;
import com.bloghorizon.backend.dtos.UserSignupRequest;
import com.bloghorizon.backend.entities.User;
import com.bloghorizon.backend.repositories.UserRepository;
import com.bloghorizon.backend.responses.ApiResponse;
import com.bloghorizon.backend.responses.ResponseBuilder;
import com.bloghorizon.backend.services.UserService;
import com.bloghorizon.backend.services.auth0.Auth0ManagementService;
import com.bloghorizon.backend.utils.SequenceGeneratorService;
import com.bloghorizon.backend.utils.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGenerator;
    private final Auth0ManagementService auth0Service;


    @Override
    public ResponseEntity<ApiResponse<SignupResponse>> signup(UserSignupRequest request) {
        if (userRepository.findByAuth0UserId(request.getAuth0UserId()).isPresent()) {
            ResponseBuilder.conflict("User with Auth0 ID already exists");
        }

        User user = new User();
        user.setId(sequenceGenerator.generateSequence(User.class.getSimpleName()));
        user.setAuth0UserId(request.getAuth0UserId());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setCompletedSignup(false);

        userRepository.save(user);
        return ResponseBuilder.success(new SignupResponse(user), "Signup successful");
    }

    @Override
    public ResponseEntity<ApiResponse<UserResponse>> getUserDetails(String auth0UserId) {
        Optional<User> optionalUser = userRepository.findByAuth0UserId(auth0UserId);
        return optionalUser
                .map(user -> ResponseBuilder.success(new UserResponse(user), "User fetched"))
                .orElseGet(() -> ResponseBuilder.notFound("User not found with Auth0 ID: " + auth0UserId));
    }

    @Override
    public ResponseEntity<ApiResponse<Boolean>> checkUsernameAvailability(String userName) {
        boolean exists = userRepository.existsByUsername(userName);
        return ResponseBuilder.success(!exists, "Username check complete");
    }

    @Override
    public ResponseEntity<ApiResponse<UserResponse>> completeSignup(String auth0UserId, CompleteSignupRequest request) {
        Optional<User> optionalUser = userRepository.findByAuth0UserId(auth0UserId);
        if (optionalUser.isEmpty()) {
            return ResponseBuilder.notFound("User not found");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseBuilder.conflict("Username already taken");
        }

        User user = optionalUser.get();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setBirthday(request.getBirthday());
        user.setBio(request.getBio());
        user.setWebsite(request.getWebsite());
        user.setLocation(request.getLocation());
        user.setCompletedSignup(true);

        userRepository.save(user);

        // Update Auth0 metadata
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("bio", request.getBio());
        metadata.put("website", request.getWebsite());
        metadata.put("location", request.getLocation());
        metadata.put("birthday", request.getBirthday());
        metadata.put("username", request.getUsername());
        metadata.put("name",request.getName());

        try {
            auth0Service.updateUserMetadata(auth0UserId, metadata);
        } catch (Exception ex) {
            System.out.println("Failed to update Auth0 metadata for user " + auth0UserId + ": " + ex.getMessage());
        }

        return ResponseBuilder.success(UserMapper.toUserResponse(user), "Signup completed successfully");

    }
}
