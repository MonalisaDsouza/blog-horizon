package com.bloghorizon.backend.services;

import com.bloghorizon.backend.entities.Blog;
import com.bloghorizon.backend.dtos.BlogDto;
import org.springframework.data.domain.Page;

public interface BlogService {
    Blog createBlog(Blog blog);
    Page<BlogDto> getAllBlogs(int page, int size);
    Blog getBlogById(Long id);
    Blog updateBlog(Long id, Blog blog);
    void deleteBlog(Long id);
    Page<BlogDto> getBlogsByAuth0UserId(String auth0UserId, int page, int limit);
}