package com.example.studentgrades.grade;

import com.example.studentgrades.grade.dto.*;
import com.example.studentgrades.grade.dto.GradeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GradeStatsService {

    private final GradeRepository repo;

    private static final int PASS_THRESHOLD = 5; // minimul pentru promovare

    public AvgResponse averageByStudent(Long studentId) {
        double avg = repo.avgByStudent(studentId).orElse(0.0);
        return new AvgResponse(studentId, round2(avg));
    }


    public AvgResponse averageByCourse(Long courseId) {
        double avg = repo.avgByCourse(courseId).orElse(0.0);
        return new AvgResponse(courseId, round2(avg));
    }

    public PassRateResponse passRateByCourse(Long courseId) {
        var grades = repo.findByCourseId(courseId);
        long total = grades.size();
        long passed = grades.stream().filter(g -> g.getValue() >= PASS_THRESHOLD).count();
        double rate = total == 0 ? 0.0 : (passed * 100.0 / total);
        return PassRateResponse.builder()
                .courseId(courseId)
                .passRate(round2(rate))
                .passed(passed)
                .total(total)
                .build();
    }

    public List<GradeDto> search(GradeFilterRequest req) {
        var out = repo.search(
                req.getStudentId(),
                req.getCourseId(),
                req.getMinValue(),
                req.getMaxValue(),
                req.getFromDate(),
                req.getToDate()
        );
        return out.stream()
                .map(GradeDto::fromEntity)
                .collect(Collectors.toList());
    }
    private static double round2(double x) {
        return Math.round(x * 100.0) / 100.0;
    }
}