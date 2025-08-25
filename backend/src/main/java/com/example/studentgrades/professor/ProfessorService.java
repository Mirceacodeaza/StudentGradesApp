package com.example.studentgrades.professor;

import com.example.studentgrades.professor.dto.ProfessorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository repo;

    public List<Professor> findAll() { return repo.findAll(); }

    public Professor findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Profesor inexistent"));
    }

    public Professor create(ProfessorDto dto) {
        if (repo.existsByEmail(dto.email())) {
            throw new DataIntegrityViolationException("Email-ul există deja");
        }
        Professor p = Professor.builder()
                .name(dto.name())
                .email(dto.email())
                .build();
        return repo.save(p);
    }

    public Professor update(Long id, ProfessorDto dto) {
        Professor p = findById(id);
        if (!p.getEmail().equals(dto.email()) && repo.existsByEmail(dto.email())) {
            throw new DataIntegrityViolationException("Email-ul există deja");
        }
        p.setName(dto.name());
        p.setEmail(dto.email());
        return repo.save(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

