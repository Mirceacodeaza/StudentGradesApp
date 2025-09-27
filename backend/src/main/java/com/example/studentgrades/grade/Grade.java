package com.example.studentgrades.grade;

import com.example.studentgrades.student.Student;
import com.example.studentgrades.course.Course;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;

@Entity
//saptamana 7
@Table(
        name = "grades",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_grade_student_course",
                columnNames = {"student_id", "course_id"}
        )
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Grade {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(1) @Max(10)
    @Column(nullable = false)
    private Integer value;

    @Column(nullable = false)
    private LocalDate date;  // data evaluării

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_grade_student"))
    private Student student;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_grade_course"))
    private Course course;
}
