package com.example.studentgrades.grade;

import com.example.studentgrades.grade.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades/stats")
@RequiredArgsConstructor
public class GradeStatsController {

    private final GradeStatsService service;

    // 1) Medie pe student
    @GetMapping("/avg/student/{studentId}")
    public ResponseEntity<AvgResponse> avgByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(service.averageByStudent(studentId));
    }

    // 2) Medie pe curs
    @GetMapping("/avg/course/{courseId}")
    public ResponseEntity<AvgResponse> avgByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(service.averageByCourse(courseId));
    }

    // 3) Promovabilitate pe curs (procent de note >= 5)
    @GetMapping("/pass-rate/course/{courseId}")
    public ResponseEntity<PassRateResponse> passRateByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(service.passRateByCourse(courseId));
    }

    // 4) Filtrare note după  curs, student, interval note, interval dată
    @PostMapping("/search")
    public ResponseEntity<List<GradeDto>> search(@RequestBody GradeFilterRequest req) {
        return ResponseEntity.ok(service.search(req));
    }
}