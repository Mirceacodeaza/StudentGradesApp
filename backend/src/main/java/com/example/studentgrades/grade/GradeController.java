package com.example.studentgrades.grade;

import com.example.studentgrades.grade.dto.GradeDto;
import com.example.studentgrades.grade.dto.GradeRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService service;

    // GET /api/grades?studentId=..&courseId=..
    @GetMapping
    public ResponseEntity<List<GradeDto>> all(
            @RequestParam(required = false) Long studentId,
            @RequestParam(required = false) Long courseId
    ) {
        if (studentId != null) return ResponseEntity.ok(service.findByStudent(studentId));
        if (courseId  != null) return ResponseEntity.ok(service.findByCourse(courseId));
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GradeDto> one(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<GradeDto> create(@Valid @RequestBody GradeRequest req) {
        return ResponseEntity.ok(service.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GradeDto> update(@PathVariable Long id,
                                           @Valid @RequestBody GradeRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
