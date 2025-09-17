package com.example.studentgrades.grade.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class AvgResponse {
    private Long id;         // studentId sau courseId
    private double average;  // media
}