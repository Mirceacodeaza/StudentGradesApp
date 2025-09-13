package com.example.studentgrades.grade;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    List<Grade> findByStudent_Id(Long studentId);

    List<Grade> findByCourse_Id(Long courseId);
}
