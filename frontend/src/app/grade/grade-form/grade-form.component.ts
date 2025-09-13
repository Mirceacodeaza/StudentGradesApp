import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from '../../core/models/grade.model';
import { GradeService } from '../../core/services/grade.service';
import { StudentService } from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';
import { Student } from '../../core/models/student.model';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  standalone: false
})
export class GradeFormComponent implements OnInit {
  model: Grade = { value: 1, date: this.today(), studentId: 0, courseId: 0 };
  isEdit = false;
  id?: number;

  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gradeService: GradeService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // încărcăm dropdown-urile
    this.studentService.getAll().subscribe(res => (this.students = res));
    this.courseService.getAll().subscribe(res => (this.courses = res));

    // preload pt. edit
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;
    if (idParam) {
      this.id = +idParam;
      this.gradeService.getById(this.id).subscribe(g => (this.model = g));
    }

    // preselect student din query (când venim din listă)
    const studentId = this.route.snapshot.queryParamMap.get('studentId');
    if (!this.isEdit && studentId) {
      this.model.studentId = +studentId;
    }
  }

  save(): void {
    const req = this.isEdit && this.id
      ? this.gradeService.update(this.id, this.model)
      : this.gradeService.create(this.model);

    req.subscribe(() => {
      // după salvare, revin în listă, păstrez filtrul student dacă există
      const q = this.model.studentId ? { queryParams: { studentId: this.model.studentId } } : {};
      this.router.navigate(['/grade'], q);
    });
  }

  cancel(): void {
    const q = this.model.studentId ? { queryParams: { studentId: this.model.studentId } } : {};
    this.router.navigate(['/grade'], q);
  }

  private today(): string {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
}
