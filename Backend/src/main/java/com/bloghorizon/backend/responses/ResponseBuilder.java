package com.bloghorizon.backend.responses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {

    // 200 OK — generic success
    public static <T> ResponseEntity<ApiResponse<T>> success(T data, String message) {
        return ResponseEntity.ok(new ApiResponse<>(true, message, data));
    }

    // 201 Created
    public static <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, message, data));
    }

    // 204 No Content (use when data is not needed, like delete success or empty result)
    public static <T> ResponseEntity<ApiResponse<T>> noContent(String message) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse<>(true, message, null));
    }

    // 404 Not Found
    public static <T> ResponseEntity<ApiResponse<T>> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, message, null));
    }

    // Generic Error with any HTTP status (400, 409, 500, etc.)
    public static <T> ResponseEntity<ApiResponse<T>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(new ApiResponse<>(false, message, null));
    }

    // Optional: Bad Request Shortcut
    public static <T> ResponseEntity<ApiResponse<T>> badRequest(String message) {
        return error(message, HttpStatus.BAD_REQUEST);
    }

    // Optional: Conflict Shortcut
    public static <T> ResponseEntity<ApiResponse<T>> conflict(String message) {
        return error(message, HttpStatus.CONFLICT);
    }
}

