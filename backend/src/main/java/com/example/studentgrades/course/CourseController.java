
package com.example.studentgrades.course;

import com.example.studentgrades.course.dto.CourseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService service;

    @GetMapping
    public List<Course> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public Course one(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ResponseEntity<Course> create(@Valid @RequestBody CourseDto dto) {
        Course saved = service.create(dto);
        return ResponseEntity.created(URI.create("/api/courses/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @Valid @RequestBody CourseDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
