package com.bloghorizon.backend.services.auth0;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class Auth0ManagementService {

    private final Auth0TokenService tokenService;
    private final RestTemplate restTemplate;

    @Value("${AUTH0_DOMAIN}")
    private String domain;


    public Auth0ManagementService(Auth0TokenService tokenService, RestTemplate restTemplate) {
        this.tokenService = tokenService;
        this.restTemplate = restTemplate;
    }

    public void updateUserMetadata(String auth0UserId, Map<String, Object> metadata) {
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = Map.of("user_metadata", metadata);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        String url = "https://" + domain + "/api/v2/users/" + auth0UserId;

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PATCH, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to update Auth0 metadata for user: " + response.getBody());
        }
    }
}