package com.example.studentgrades.dashboard.dto;

public record TopStudentDto(
        Long studentId,
        String studentName,
        Double average
) {}
