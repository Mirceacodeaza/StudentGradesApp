import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../core/models/course.model';
import { CourseService } from '../../core/services/course.service';
import { ProfessorService } from '../../core/services/professor.service';
import { Professor } from '../../core/models/professor.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  standalone: false
})
export class CourseFormComponent implements OnInit {
  model: Course = { name: '', professorId: 0 };
  isEdit = false;
  id?: number;
  professors: Professor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CourseService,
    private profService: ProfessorService
  ) {}

  ngOnInit(): void {
    this.profService.getAll().subscribe(res => this.professors = res);

    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;
    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe(res => this.model = res);
    }
  }

  save() {
    const req = this.isEdit && this.id
      ? this.service.update(this.id, this.model)
      : this.service.create(this.model);

    req.subscribe(() => this.router.navigate(['/course']));
  }
}
