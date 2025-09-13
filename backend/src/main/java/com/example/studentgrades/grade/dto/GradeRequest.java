package com.example.studentgrades.grade.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record GradeRequest(
        @NotNull Long studentId,
        @NotNull Long courseId,
        @NotNull @Min(1) @Max(10) Integer value,
        @NotNull LocalDate date
) {}
