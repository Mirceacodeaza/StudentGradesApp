package com.example.studentgrades.grade;

import com.example.studentgrades.course.Course;
import com.example.studentgrades.course.CourseRepository;
import com.example.studentgrades.grade.dto.GradeDto;
import com.example.studentgrades.grade.dto.GradeRequest;
import com.example.studentgrades.student.Student;
import com.example.studentgrades.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GradeService {

    private final GradeRepository repo;
    private final StudentRepository studentRepo;
    private final CourseRepository courseRepo;

    // LISTĂRI
    public List<GradeDto> findAll() {
        return repo.findAll().stream()
                .map(GradeDto::fromEntity)
                .toList();
    }

    public List<GradeDto> findByStudent(Long studentId) {
        return repo.findByStudentId(studentId).stream()
                .map(GradeDto::fromEntity)
                .toList();
    }

    public List<GradeDto> findByCourse(Long courseId) {
        return repo.findByCourseId(courseId).stream()
                .map(GradeDto::fromEntity)
                .toList();
    }

    public GradeDto findById(Long id) {
        return repo.findById(id)
                .map(GradeDto::fromEntity)
                .orElseThrow(() -> new IllegalArgumentException("Nota inexistentă"));
    }
    //saptamana 7
    private void validateGradeDate(LocalDate gradeDate, Course course) {
        if (gradeDate == null) {
            throw new DataIntegrityViolationException("Data notei este obligatorie.");
        }

        if (gradeDate.isAfter(LocalDate.now())) {
            throw new DataIntegrityViolationException("Data notei nu poate fi în viitor.");
        }

        try {
            var startField = Course.class.getDeclaredField("startDate");
            startField.setAccessible(true);
            Object start = startField.get(course);
            if (start instanceof LocalDate startDate) {
                if (gradeDate.isBefore(startDate)) {
                    throw new DataIntegrityViolationException(
                            "Data notei trebuie să fie după începerea cursului (" + startDate + ")."
                    );
                }
            }
        } catch (NoSuchFieldException | IllegalAccessException ignored) {

        }
    }
    // CREARE
    public GradeDto create(GradeRequest req) {
        Student s = studentRepo.findById(req.studentId())
                .orElseThrow(() -> new IllegalArgumentException("Student inexistent"));
        Course c = courseRepo.findById(req.courseId())
                .orElseThrow(() -> new IllegalArgumentException("Curs inexistent"));

        if (req.value() < 1 || req.value() > 10) {
            throw new DataIntegrityViolationException("Valoarea notei trebuie să fie între 1 și 10");
        }
        if (repo.existsByStudent_IdAndCourse_Id(req.studentId(), req.courseId())) {
            throw new DataIntegrityViolationException("Există deja o notă pentru acest student la acest curs.");
        }

        Grade g = Grade.builder()
                .student(s)
                .course(c)
                .value(req.value())
                .date(req.date())
                .build();

        return GradeDto.fromEntity(repo.save(g));
    }

    // EDITARE
    public GradeDto update(Long id, GradeRequest req) {
        Grade g = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Nota inexistentă"));

        if (!g.getStudent().getId().equals(req.studentId())) {
            Student s = studentRepo.findById(req.studentId())
                    .orElseThrow(() -> new IllegalArgumentException("Student inexistent"));
            g.setStudent(s);
        }
        if (!g.getCourse().getId().equals(req.courseId())) {
            Course c = courseRepo.findById(req.courseId())
                    .orElseThrow(() -> new IllegalArgumentException("Curs inexistent"));
            g.setCourse(c);
        }

        if (req.value() < 1 || req.value() > 10) {
            throw new DataIntegrityViolationException("Valoarea notei trebuie să fie între 1 și 10");
        }

        if (repo.existsByStudent_IdAndCourse_IdAndIdNot(req.studentId(), req.courseId(), id)) {
            throw new DataIntegrityViolationException("Există deja o notă pentru acest student la acest curs.");
        }
        g.setValue(req.value());
        g.setDate(req.date());

        return GradeDto.fromEntity(repo.save(g));
    }

    // ȘTERGERE
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Nota inexistentă");
        }
        repo.deleteById(id);
    }
}
