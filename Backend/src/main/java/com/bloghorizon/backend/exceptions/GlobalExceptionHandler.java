package com.bloghorizon.backend.exceptions;


import com.bloghorizon.backend.responses.ApiResponse;
import com.bloghorizon.backend.responses.ResponseBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle Resource Not Found (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseBuilder.error(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handle Illegal Argument (400)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseBuilder.error(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Handle Generic Exceptions (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralError(Exception ex) {
        ex.printStackTrace(); // Optional: log to file
        return ResponseBuilder.error("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}