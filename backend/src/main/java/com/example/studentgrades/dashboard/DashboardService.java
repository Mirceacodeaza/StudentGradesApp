package com.example.studentgrades.dashboard;

import com.example.studentgrades.dashboard.dto.DashboardResponse;
import com.example.studentgrades.dashboard.dto.PopularCourseDto;
import com.example.studentgrades.dashboard.dto.TopStudentDto;
import com.example.studentgrades.grade.GradeRepository;
import com.example.studentgrades.course.CourseRepository;
import com.example.studentgrades.professor.ProfessorRepository;
import com.example.studentgrades.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final GradeRepository gradeRepo;
    private final StudentRepository studentRepo;
    private final ProfessorRepository professorRepo;
    private final CourseRepository courseRepo;

    public List<TopStudentDto> getTopStudents(int limit) {
        return gradeRepo.topStudents(PageRequest.of(0, limit));
    }

    public List<PopularCourseDto> getPopularCourses(int limit) {
        return gradeRepo.popularCourses(PageRequest.of(0, limit));
    }

    public Map<String, Long> getTotals() {
        Map<String, Long> out = new HashMap<>();
        out.put("students",   studentRepo.count());
        out.put("professors", professorRepo.count());
        out.put("courses",    courseRepo.count());
        return out;
    }

    // răspuns compus (bun pentru un singur call din frontend)
    public DashboardResponse getAll(int topN, int popularN) {
        return new DashboardResponse(
                getTopStudents(topN),
                getPopularCourses(popularN),
                studentRepo.count(),
                professorRepo.count(),
                courseRepo.count()
        );
    }
}
