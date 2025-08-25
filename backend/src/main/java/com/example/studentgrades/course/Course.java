package com.example.studentgrades.course;

import com.example.studentgrades.professor.Professor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Numele cursului este obligatoriu")
    @Column(nullable = false)
    private String name;

    // relație: fiecare curs are UN profesor
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_course_professor"))
    private Professor professor;
}

