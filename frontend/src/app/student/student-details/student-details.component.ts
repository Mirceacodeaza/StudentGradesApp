import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  standalone: false
})
export class StudentDetailsComponent implements OnInit {
  student?: Student;

  constructor(private route: ActivatedRoute, private service: StudentService) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    if (id) {
      this.service.getById(id).subscribe(s => this.student = s);
    }
  }
}
