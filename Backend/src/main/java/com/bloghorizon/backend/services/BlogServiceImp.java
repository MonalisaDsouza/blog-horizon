package com.bloghorizon.backend.services;

import com.bloghorizon.backend.entity.Blog;
import com.bloghorizon.backend.dto.BlogDto;
import com.bloghorizon.backend.entity.User;
import com.bloghorizon.backend.exceptions.ResourceNotFoundException;
import com.bloghorizon.backend.repositories.BlogRepository;
import com.bloghorizon.backend.repositories.UserRepository;
import com.bloghorizon.backend.utils.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BlogServiceImp implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGenerator;

    @Autowired
    public BlogServiceImp(BlogRepository blogRepository,
                          SequenceGeneratorService sequenceGenerator,
                          UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.sequenceGenerator = sequenceGenerator;
        this.userRepository = userRepository;
    }

    @Override
    public Blog createBlog(Blog blog) {
        blog.setId(sequenceGenerator.generateSequence("blog_sequence"));
        long now = System.currentTimeMillis();
        blog.setCreatedAt(now);
        blog.setUpdatedAt(now);
        return blogRepository.save(blog);
    }


    @Override
    public Page<BlogDto> getAllBlogs(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Blog> blogPage = blogRepository.findAll(pageable);

        List<String> auth0UserIds = blogPage.getContent().stream()
                .map(Blog::getAuth0UserId)
                .distinct()
                .toList();

        Map<String, String> auth0UserIdToName = userRepository.findByAuth0UserIdIn(auth0UserIds)
                .stream()
                .collect(Collectors.toMap(User::getAuth0UserId, User::getUsername));

        List<BlogDto> dtoList = blogPage.getContent().stream()
                .map(blog -> new BlogDto(
                        blog.getId(),
                        blog.getTitle(),
                        blog.getContent(),
                        blog.getAuth0UserId(),
//                        auth0UserIdToName.getOrDefault(blog.getAuth0UserId(), "Unknown"),
                        blog.getTags(),
                        blog.getLikesCount(),
                        blog.getCommentsCount(),
                        blog.getAuthorName(),
                        blog.getAuthorUsername()
                ))
                .toList();

        return new PageImpl<>(dtoList, pageable, blogPage.getTotalElements());
    }

    @Override
    public Page<BlogDto> getBlogsByAuth0UserId(String auth0UserId, int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Blog> blogPage = blogRepository.findByAuth0UserId(auth0UserId, pageable);

//        String authorName = userRepository.findByAuth0UserId(auth0UserId)
//                .map(User::getUsername)
//                .orElse("Unknown");

        List<BlogDto> dtoList = blogPage.getContent().stream()
                .map(blog -> new BlogDto(
                        blog.getId(),
                        blog.getTitle(),
                        blog.getContent(),
                        blog.getAuth0UserId(),
                        blog.getTags(),
                        blog.getLikesCount(),
                        blog.getCommentsCount(),
                        blog.getAuthorName(),
                        blog.getAuthorUsername()
                ))
                .toList();

        return new PageImpl<>(dtoList, pageable, blogPage.getTotalElements());
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
    }

    @Override
    public Blog updateBlog(Long id, Blog updatedBlog) {
        Blog existingBlog = getBlogById(id);
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setContent(updatedBlog.getContent());
        existingBlog.setTags(updatedBlog.getTags());
        existingBlog.setLikesCount(updatedBlog.getLikesCount());
        existingBlog.setCommentsCount(updatedBlog.getCommentsCount());
        existingBlog.setUpdatedAt(System.currentTimeMillis());
        existingBlog.setAuthorName(updatedBlog.getAuthorName());
        existingBlog.setAuthorUsername(updatedBlog.getAuthorUsername());
        return blogRepository.save(existingBlog);
    }

    @Override
    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }
}