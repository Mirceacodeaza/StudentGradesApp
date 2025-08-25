package com.example.studentgrades.professor;

import com.example.studentgrades.professor.dto.ProfessorDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/professors")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService service;

    @GetMapping
    public List<Professor> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public Professor one(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public ResponseEntity<Professor> create(@Valid @RequestBody ProfessorDto dto) {
        Professor saved = service.create(dto);
        return ResponseEntity.created(URI.create("/api/professors/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Professor update(@PathVariable Long id, @Valid @RequestBody ProfessorDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

