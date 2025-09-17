package com.example.studentgrades.grade.dto;

import com.example.studentgrades.grade.Grade;
import java.io.Serializable;
import java.time.LocalDate;

public record GradeDto(
        Long id,
        Integer value,
        LocalDate date,
        Long studentId,
        String studentName,
        Long courseId,
        String courseName
) implements Serializable {

    // Metodă statică pentru conversia din entitate în DTO
    public static GradeDto fromEntity(Grade g) {
        if (g == null) {
            return null;
        }
        return new GradeDto(
                g.getId(),
                g.getValue(),
                g.getDate(),
                g.getStudent() != null ? g.getStudent().getId() : null,
                g.getStudent() != null ? g.getStudent().getFullName() : null,
                g.getCourse()  != null ? g.getCourse().getId() : null,
                g.getCourse()  != null ? g.getCourse().getName() : null
        );
    }
}
