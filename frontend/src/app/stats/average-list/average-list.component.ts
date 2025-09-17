import { Component } from '@angular/core';
import { GradeStatsService, AvgResponse } from './../../core/services/grade-stats.service';

@Component({
  selector: 'app-average-list',
  templateUrl: './average-list.component.html',
  standalone: false
})
export class AverageListComponent {
  studentId?: number;
  result?: AvgResponse;
  error = '';

  constructor(private stats: GradeStatsService) {}

  load() {
    this.error = '';
    this.result = undefined;
    if (!this.studentId) { this.error = 'Introdu un studentId'; return; }
    this.stats.averageByStudent(this.studentId).subscribe({
      next: r => this.result = r,
      error: _ => this.error = 'Nu am putut încărca media.'
    });
  }
}
