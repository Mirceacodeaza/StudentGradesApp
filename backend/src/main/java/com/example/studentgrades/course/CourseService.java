package com.example.studentgrades.course;

import com.example.studentgrades.course.dto.CourseDto;
import com.example.studentgrades.professor.Professor;
import com.example.studentgrades.professor.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepo;
    private final ProfessorRepository profRepo;

    public List<Course> findAll() { return courseRepo.findAll(); }

    public Course findById(Long id) {
        return courseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Curs inexistent"));
    }

    public Course create(CourseDto dto) {
        Professor prof = profRepo.findById(dto.professorId())
                .orElseThrow(() -> new IllegalArgumentException("Profesor inexistent"));
        Course c = Course.builder()
                .name(dto.name())
                .professor(prof)
                .build();
        return courseRepo.save(c);
    }

    public Course update(Long id, CourseDto dto) {
        Course c = findById(id);
        c.setName(dto.name());
        if (!c.getProfessor().getId().equals(dto.professorId())) {
            Professor prof = profRepo.findById(dto.professorId())
                    .orElseThrow(() -> new IllegalArgumentException("Profesor inexistent"));
            c.setProfessor(prof);
        }
        return courseRepo.save(c);
    }

    public void delete(Long id) {
        courseRepo.deleteById(id);
    }
}

