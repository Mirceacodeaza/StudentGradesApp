package com.example.studentgrades.professor.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ProfessorDto(
        Long id,
        @NotBlank String name,
        @Email @NotBlank String email
) { }

