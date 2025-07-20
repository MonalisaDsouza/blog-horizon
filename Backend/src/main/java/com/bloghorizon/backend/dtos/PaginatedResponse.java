package com.bloghorizon.backend.dtos;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResponse<T> {
    private List<T> content;
    private long totalCount;
    private int limit;
    private int page;

//    public PaginatedResponse(List<T> content, long totalCount, int limit, int page) {
//        this.content = content;
//        this.totalCount = totalCount;
//        this.limit = limit;
//        this.page = page;
//    }

}

