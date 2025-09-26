package com.example.studentgrades.grade;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.example.studentgrades.dashboard.dto.PopularCourseDto;
import com.example.studentgrades.dashboard.dto.TopStudentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
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

    /** Top studenți după medie */
    @Query("""
       select new com.example.studentgrades.dashboard.dto.TopStudentDto(
           s.id,
           concat(s.firstName, ' ', s.lastName),
           avg(g.value)
       )
       from Grade g
       join g.student s
       group by s.id, s.firstName, s.lastName
       order by avg(g.value) desc
       """)
    List<TopStudentDto> topStudents(Pageable pageable);

    /** Cursuri populare (după numărul de studenți notați, distinct) */
    @Query("""
       select new com.example.studentgrades.dashboard.dto.PopularCourseDto(
           c.id,
           c.name,
           count(distinct s.id)
       )
       from Grade g
       join g.course c
       join g.student s
       group by c.id, c.name
       order by count(distinct s.id) desc
       """)
    List<PopularCourseDto> popularCourses(Pageable pageable);


}
