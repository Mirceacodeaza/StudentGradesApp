import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  standalone: false
})
export class StudentFormComponent implements OnInit {
  model: Student = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    matriculationNumber: ''
  };

  isEdit = false;
  id?: number;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StudentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;

    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe({
        next: s => this.model = s
      });
    }
  }

  save(): void {
    const req = this.isEdit && this.id
      ? this.service.update(this.id, this.model)
      : this.service.create(this.model);

    req.subscribe({
      next: _ => this.router.navigate(['/student']),
      error: err => this.errorMsg = err?.error ?? 'Eroare la salvare.'
    });
  }

  cancel(): void {
    this.router.navigate(['/student']);
  }
}
