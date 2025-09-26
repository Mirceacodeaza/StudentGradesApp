package com.example.studentgrades.dashboard;

import com.example.studentgrades.dashboard.dto.DashboardResponse;
import com.example.studentgrades.dashboard.dto.PopularCourseDto;
import com.example.studentgrades.dashboard.dto.TopStudentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService service;

    // GET /api/dashboard/top-students?limit=5
    @GetMapping("/top-students")
    public List<TopStudentDto> topStudents(@RequestParam(defaultValue = "5") int limit) {
        return service.getTopStudents(limit);
    }

    // GET /api/dashboard/popular-courses?limit=5
    @GetMapping("/popular-courses")
    public List<PopularCourseDto> popularCourses(@RequestParam(defaultValue = "5") int limit) {
        return service.getPopularCourses(limit);
    }

    // GET /api/dashboard/totals
    @GetMapping("/totals")
    public Map<String, Long> totals() {
        return service.getTotals();
    }

    // GET /api/dashboard  (agregat: top + popular + totaluri)
    @GetMapping
    public DashboardResponse all(@RequestParam(defaultValue = "5") int top,
                                 @RequestParam(defaultValue = "5") int popular) {
        return service.getAll(top, popular);
    }
}
