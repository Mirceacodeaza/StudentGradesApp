package com.example.studentgrades.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_student_email", columnNames = "email"),
                @UniqueConstraint(name = "uk_student_matric_no", columnNames = "matriculation_number")
        }
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Prenumele este obligatoriu")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Numele este obligatoriu")
    @Column(nullable = false)
    private String lastName;

    @Email(message = "Email invalid")
    @NotBlank(message = "Emailul este obligatoriu")
    @Column(nullable = false)
    private String email;

    @Past(message = "Data nașterii trebuie să fie în trecut")
    @Column(nullable = false)
    private LocalDate birthDate;

    @NotBlank(message = "Numărul matricol este obligatoriu")
    @Column(name = "matriculation_number", nullable = false)
    private String matriculationNumber;

    // în Student.java
    @Transient
    public String getFullName() {
        String fn = getFirstName();
        String ln = getLastName();
        if (fn == null && ln == null) return null;
        if (fn == null) return ln;
        if (ln == null) return fn;
        return fn + " " + ln;
    }

}
