package com.example.studentgrades.dashboard.dto;

public record PopularCourseDto(
        Long courseId,
        String courseName,
        Long gradedStudents   // număr de studenți notați (distinct)
) {}
