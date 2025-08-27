import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../core/services/professor.service';
import { Professor } from '../../core/models/professor.model';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  standalone: false
})
export class ProfessorFormComponent implements OnInit {
  model: Professor = { name: '', email: '' };
  isEdit = false;
  id?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfessorService
  ) {}

  ngOnInit(): void {
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

    req.subscribe(() => this.router.navigate(['/professor']));
  }
}
