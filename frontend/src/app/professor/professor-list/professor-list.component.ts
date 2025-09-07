import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../core/services/professor.service';
import { Professor } from '../../core/models/professor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  standalone: false
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[] = [];
  loading = false;

  constructor(private profService: ProfessorService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.profService.getAll().subscribe({
      next: res => { this.professors = res; this.loading = false; },
      error: _ => this.loading = false
    });
  }

  add() { this.router.navigate(['/professors/new']); }
  edit(p: Professor) { this.router.navigate(['/professors', p.id, 'edit']); }
  remove(p: Professor) {
    if (!p.id) return;
    if (confirm('Ștergi profesorul?')) {
      this.profService.remove(p.id).subscribe(() => this.load());
    }
  }
}
