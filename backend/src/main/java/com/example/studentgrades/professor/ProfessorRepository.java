package com.example.studentgrades.professor;

import com.example.studentgrades.professor.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByEmail(String email);
    Optional<Professor> findByEmail(String email);
}
