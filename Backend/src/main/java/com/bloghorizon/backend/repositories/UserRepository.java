package com.bloghorizon.backend.repositories;


import com.bloghorizon.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,Long> {
    boolean existsByUsername(String username);
    List<User> findByAuth0UserIdIn(List<String> auth0UserIds);
    Optional<User> findByAuth0UserId(String auth0UserId);
    Optional<User> findByEmail(String email);
}

