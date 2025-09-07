import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  standalone: false
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = false;

  constructor(private service: CourseService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: res => { this.courses = res; this.loading = false; },
      error: _ => this.loading = false
    });
  }

  add() { this.router.navigate(['/courses/new']); }
  edit(c: Course) { this.router.navigate(['/courses', c.id, 'edit']); }
  remove(c: Course) {
    if (!c.id) return;
    if (confirm('Ștergi cursul?')) {
      this.service.remove(c.id).subscribe(() => this.load());
    }
  }
}
