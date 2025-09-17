package com.example.studentgrades.grade.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GradeFilterRequest {
    private Long studentId;
    private Long courseId;
    private Integer minValue; // ex: 1
    private Integer maxValue; // ex: 10
    private LocalDate fromDate;
    private LocalDate toDate;
}
