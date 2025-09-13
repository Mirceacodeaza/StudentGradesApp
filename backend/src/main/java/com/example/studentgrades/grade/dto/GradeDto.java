package com.example.studentgrades.grade.dto;

import java.time.LocalDate;

public record GradeDto(
        Long id,
        Integer value,
        LocalDate date,
        Long studentId,
        String studentName,
        Long courseId,
        String courseName
) {}
