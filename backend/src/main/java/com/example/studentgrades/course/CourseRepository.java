package com.example.studentgrades.course;


import com.example.studentgrades.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> { }

