import { Component } from '@angular/core';
import { GradeStatsService, PassRateResponse } from './../../core/services/grade-stats.service';

@Component({
  selector: 'app-pass-rate',
  templateUrl: './pass-rate.component.html',
  standalone: false
})
export class PassRateComponent {
  courseId?: number;
  data?: PassRateResponse;
  error = '';

  constructor(private stats: GradeStatsService) {}

  load() {
    this.error = '';
    this.data = undefined;
    if (!this.courseId) { this.error = 'Introdu un courseId'; return; }

    this.stats.passRateByCourse(this.courseId).subscribe({
      next: r => this.data = r,
      error: _ => this.error = 'Nu am putut încărca promovabilitatea.'
    });
  }

  get failed(): number {
    return this.data ? (this.data.total - this.data.passed) : 0;
  }
}
