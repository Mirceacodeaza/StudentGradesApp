package com.example.studentgrades.professor;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "professors", uniqueConstraints = {
        @UniqueConstraint(name = "uk_prof_email", columnNames = "email")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Professor {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Numele este obligatoriu")
    @Column(nullable = false)
    private String name;

    @Email(message = "Email invalid")
    @NotBlank(message = "Emailul este obligatoriu")
    @Column(nullable = false)
    private String email;
}

