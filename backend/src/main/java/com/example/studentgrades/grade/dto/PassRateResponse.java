package com.example.studentgrades.grade.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class PassRateResponse {
    private Long courseId;
    private double passRate; // procent (0..100)
    private long passed;
    private long total;
}