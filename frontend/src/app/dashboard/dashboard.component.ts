import { Component, OnInit } from '@angular/core';
import { DashboardService, CountsResponse, TopStudentDto, PopularCourseDto } from './../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  loading = false;
  error?: string;

  counts?: CountsResponse;
  topStudents: TopStudentDto[] = [];
  popularCourses: PopularCourseDto[] = [];

  topSize = 5;
  popularSize = 5;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = undefined;

    // counts
    this.service.counts().subscribe({
      next: c => this.counts = c,
      error: _ => this.error = 'Eroare la încărcarea numerelor.'
    });

    // top students
    this.service.topStudents(this.topSize).subscribe({
      next: rows => this.topStudents = rows,
      error: _ => this.error = 'Eroare la încărcarea topului de studenți.'
    });

    // popular courses
    this.service.popularCourses(this.popularSize).subscribe({
      next: rows => this.popularCourses = rows,
      error: _ => this.error = 'Eroare la încărcarea cursurilor populare.',
      complete: () => this.loading = false
    });
  }
}
