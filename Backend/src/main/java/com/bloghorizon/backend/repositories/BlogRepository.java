package com.bloghorizon.backend.repositories;

import com.bloghorizon.backend.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogRepository extends MongoRepository<Blog, Long> {
    Page<Blog> findByAuth0UserId(String auth0UserId, Pageable pageable);
}