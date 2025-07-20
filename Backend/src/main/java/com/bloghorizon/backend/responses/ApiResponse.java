package com.bloghorizon.backend.responses;

import lombok.Getter;
import lombok.Setter;

@Setter
public class ApiResponse<T> {
    private boolean status;
    @Getter
    private String message;
    @Getter
    private T data;

    public ApiResponse(boolean status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public boolean getStatus() {
        return status;
    }
}

