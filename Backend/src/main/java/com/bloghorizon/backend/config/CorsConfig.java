package com.bloghorizon.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*") // ✅ allow all origins
                        .allowedMethods("*") // ✅ allow all HTTP methods
                        .allowedHeaders("*") // ✅ allow all headers
                        .exposedHeaders("*")
                        .allowCredentials(false) // ❌ MUST be false when using "*"
                        .maxAge(3600);

                System.out.println("✅ CORS enabled: all origins, all methods, no credentials");
            }
        };
    }
}
