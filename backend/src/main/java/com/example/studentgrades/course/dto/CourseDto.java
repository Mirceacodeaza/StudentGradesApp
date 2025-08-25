package com.example.studentgrades.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CourseDto(
        Long id,
        @NotBlank String name,
        @NotNull Long professorId
) { }
