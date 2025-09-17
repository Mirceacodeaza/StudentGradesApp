import { Component } from '@angular/core';
import { GradeService, GradeDto, GradeFilterRequest } from './../../core/services/grade.service';

@Component({
  selector: 'app-grade-filter',
  templateUrl: './grade-filter.component.html',
  standalone: false
})
export class GradeFilterComponent {
  filter: GradeFilterRequest = {};
  loading = false;
  rows: GradeDto[] = [];
  error = '';

  constructor(private grades: GradeService) {}

  search() {
    this.error = '';
    this.loading = true;
    this.grades.search(this.filter).subscribe({
      next: res => { this.rows = res; this.loading = false; },
      error: _ => { this.error = 'Eroare la căutare'; this.loading = false; }
    });
  }

  reset() {
    this.filter = {};
    this.rows = [];
  }
}
