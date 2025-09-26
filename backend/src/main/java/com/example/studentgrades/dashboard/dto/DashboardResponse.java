package com.example.studentgrades.dashboard.dto;

import java.util.List;

public record DashboardResponse(
        List<TopStudentDto> topStudents,
        List<PopularCourseDto> popularCourses,
        long totalStudents,
        long totalProfessors,
        long totalCourses
) {}
