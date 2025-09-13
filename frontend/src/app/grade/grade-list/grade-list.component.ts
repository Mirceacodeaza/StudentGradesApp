import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../core/services/grade.service';
import { Grade } from '../../core/models/grade.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  standalone: false
})
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];
  students: Student[] = [];
  loading = false;

  studentId?: number;

  constructor(
    private gradeService: GradeService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe(s => (this.students = s));

    const q = this.route.snapshot.queryParamMap.get('studentId');
    this.studentId = q ? +q : undefined;

    this.load();
  }

  load(): void {
    this.loading = true;
    this.gradeService.getAll(this.studentId).subscribe({
      next: res => {
        this.grades = res;
        this.loading = false;
      },
      error: _ => (this.loading = false)
    });
  }

  onStudentChange(): void {
    // pun filtrul în URL
    const params = this.studentId ? { studentId: this.studentId } : {};
    this.router.navigate([], { relativeTo: this.route, queryParams: params });
    this.load();
  }

  add(): void {
    const q = this.studentId ? { queryParams: { studentId: this.studentId } } : {};
    this.router.navigate(['/grade/new'], q);
  }

  edit(g: Grade): void {
    const q = this.studentId ? { queryParams: { studentId: this.studentId } } : {};
    this.router.navigate(['/grade', g.id, 'edit'], q);
  }

  remove(g: Grade): void {
    if (!g.id) return;
    if (confirm('Ștergi nota?')) {
      this.gradeService.remove(g.id).subscribe(() => this.load());
    }
  }
}
