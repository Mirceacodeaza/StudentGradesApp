import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  standalone: false
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;

  // căutare locală (în memorie)
  q = ''; // term generic: nume / număr matricol

  constructor(private service: StudentService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: res => { this.students = res; this.loading = false; },
      error: _ => this.loading = false
    });
  }

  // filtru simplu: firstName, lastName, matriculationNumber
  get filtered(): Student[] {
    const term = this.q.trim().toLowerCase();
    if (!term) return this.students;
    return this.students.filter(s =>
      (s.firstName + ' ' + s.lastName).toLowerCase().includes(term) ||
      s.matriculationNumber.toLowerCase().includes(term)
    );
  }

  add() { this.router.navigate(['/student/new']); }
  edit(s: Student) { if (s.id) this.router.navigate(['/student', s.id, 'edit']); }
  view(s: Student) { if (s.id) this.router.navigate(['/student', s.id]); }
  remove(s: Student) {
    if (s.id && confirm('Ștergi studentul?')) {
      this.service.remove(s.id).subscribe(() => this.load());
    }
  }
}
