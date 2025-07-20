package com.bloghorizon.backend.services.auth0;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class Auth0TokenService {

    @Value("${AUTH0_CLIENT_ID}")
    private String clientId;

    @Value("${AUTH0_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${AUTH0_DOMAIN}")
    private String domain;

    @Value("${AUTH0_AUDIENCE}")
    private String audience;

    private final RestTemplate restTemplate;

    public Auth0TokenService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAccessToken() {
        String url = "https://" + domain + "/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "client_id", clientId,
                "client_secret", clientSecret,
                "audience", audience,
                "grant_type", "client_credentials"
        );

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Object accessToken = response.getBody().get("access_token");
            if (accessToken != null) {
                return accessToken.toString();
            }
        }

        throw new RuntimeException("Failed to retrieve Auth0 Management API token");
    }
}
