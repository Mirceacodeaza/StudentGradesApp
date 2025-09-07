package com.example.studentgrades.student;

import com.example.studentgrades.student.dto.StudentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repo;

    public List<Student> findAll() {
        return repo.findAll();
    }

    public Student findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student inexistent"));
    }

    public Student create(StudentDto dto) {
        // validări de unicitate
        if (repo.existsByEmail(dto.getEmail())) {
            throw new DataIntegrityViolationException("Email-ul există deja");
        }
        if (repo.existsByMatriculationNumber(dto.getMatriculationNumber())) {
            throw new DataIntegrityViolationException("Numărul matricol există deja");
        }

        Student s = map(dto);
        s.setId(null);
        return repo.save(s);
    }

    public Student update(Long id, StudentDto dto) {
        Student existing = findById(id);

        // dacă email-ul / nr. matricol se schimbă, verifică unicitatea
        if (!existing.getEmail().equals(dto.getEmail()) &&
                repo.existsByEmail(dto.getEmail())) {
            throw new DataIntegrityViolationException("Email-ul există deja");
        }
        if (!existing.getMatriculationNumber().equals(dto.getMatriculationNumber()) &&
                repo.existsByMatriculationNumber(dto.getMatriculationNumber())) {
            throw new DataIntegrityViolationException("Numărul matricol există deja");
        }

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setBirthDate(dto.getBirthDate());
        existing.setMatriculationNumber(dto.getMatriculationNumber());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // mapper simplu DTO -> Entity
    private Student map(StudentDto d) {
        return Student.builder()
                .id(d.getId())
                .firstName(d.getFirstName())
                .lastName(d.getLastName())
                .email(d.getEmail())
                .birthDate(d.getBirthDate())
                .matriculationNumber(d.getMatriculationNumber())
                .build();
    }
}
