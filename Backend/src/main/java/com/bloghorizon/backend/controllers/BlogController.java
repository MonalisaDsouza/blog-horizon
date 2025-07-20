package com.bloghorizon.backend.controllers;

import com.bloghorizon.backend.dtos.BlogDto;
import com.bloghorizon.backend.dtos.PaginatedResponse;
import com.bloghorizon.backend.responses.ApiResponse;
import com.bloghorizon.backend.entities.Blog;
import com.bloghorizon.backend.responses.ResponseBuilder;
import com.bloghorizon.backend.services.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Create blog
    @PostMapping
    public ResponseEntity<ApiResponse<Blog>> createBlog(@RequestBody Blog blog) {
        return ResponseBuilder.created(
                blogService.createBlog(blog),
                "Blog created successfully"
        );
    }

    // Get all blogs (paginated)
    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<BlogDto>>> getAllBlogs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Page<BlogDto> blogsPage = blogService.getAllBlogs(page - 1, limit);

        PaginatedResponse<BlogDto> response = new PaginatedResponse<>(
                blogsPage.getContent(),
                blogsPage.getTotalElements(),
                blogsPage.getSize(),
                page
        );

        return ResponseBuilder.success(response, "Blogs fetched successfully");
    }

    // Get blogs by Auth0 user
    @GetMapping("/user/{auth0UserId}")
    public ResponseEntity<ApiResponse<PaginatedResponse<BlogDto>>> getBlogsByUser(
            @PathVariable String auth0UserId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Page<BlogDto> userBlogs = blogService.getBlogsByAuth0UserId(auth0UserId, page - 1, limit);

        PaginatedResponse<BlogDto> response = new PaginatedResponse<>(
                userBlogs.getContent(),
                userBlogs.getTotalElements(),
                userBlogs.getSize(),
                page
        );

        return ResponseBuilder.success(response, "User blogs fetched successfully");
    }

    // Update blog
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Blog updated = blogService.updateBlog(id, blog);
        if (updated == null) {
            return ResponseBuilder.error("Blog not found for update", HttpStatus.NOT_FOUND);
        }
        return ResponseBuilder.success(updated, "Blog updated successfully");
    }

    //Delete blog
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable Long id) {
        try {
            blogService.deleteBlog(id);
            return ResponseBuilder.noContent("Blog deleted successfully");
        } catch (Exception e) {
            return ResponseBuilder.error("Blog not found", HttpStatus.NOT_FOUND);
        }
    }
    // Get blog by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> getBlogById(@PathVariable Long id) {
        Blog blog = blogService.getBlogById(id);
        if (blog == null) {
            return ResponseBuilder.error("Blog not found", HttpStatus.NOT_FOUND);
        }
        return ResponseBuilder.success(blog, "Blog fetched successfully");
    }

}

