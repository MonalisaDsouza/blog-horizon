package com.bloghorizon.backend.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {

    private Long id;
    private String title;
    private String content;
    private String auth0UserId;
    private List<String> tags;
    private int likesCount;
    private int commentsCount;
    private String authorUsername;
    private String authorName;

}
