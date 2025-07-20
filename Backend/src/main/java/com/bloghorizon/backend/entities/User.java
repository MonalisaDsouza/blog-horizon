package com.bloghorizon.backend.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndexes({
        @CompoundIndex(name = "unique_username", def = "{'username': 1}", unique = true)
})
public class User {

    @Id
    private Long id;

    @Indexed(unique = true)
    private String auth0UserId;

    @Indexed(unique = true)
    private String email;

    private String name;

    private String username;// added during complete signup (must be unique)

    private LocalDate birthday;
    private String bio;
    private String website;
    private String location;

    private boolean completedSignup;

}
