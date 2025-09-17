package com.example.studentgrades.grade;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GradeRepository extends JpaRepository<Grade, Long> {


    List<Grade> findByStudentId(Long studentId);
    List<Grade> findByCourseId(Long courseId);

    @Query("select avg(g.value) from Grade g where g.student.id = :studentId")
    Optional<Double> avgByStudent(@Param("studentId") Long studentId);

    @Query("select avg(g.value) from Grade g where g.course.id = :courseId")
    Optional<Double> avgByCourse(@Param("courseId") Long courseId);


    @Query("""
           select g from Grade g
           where (:studentId is null or g.student.id = :studentId)
             and (:courseId  is null or g.course.id  = :courseId)
             and (:minVal    is null or g.value      >= :minVal)
             and (:maxVal    is null or g.value      <= :maxVal)
             and (:fromDate  is null or g.date       >= :fromDate)
             and (:toDate    is null or g.date       <= :toDate)
           """)
    List<Grade> search(@Param("studentId") Long studentId,
                       @Param("courseId")  Long courseId,
                       @Param("minVal")    Integer minVal,
                       @Param("maxVal")    Integer maxVal,
                       @Param("fromDate")  LocalDate fromDate,
                       @Param("toDate")    LocalDate toDate);
}
