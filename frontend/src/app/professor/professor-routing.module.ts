import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { AuthGuard } from '../core/guards/auth.guard'; 

const routes: Routes = [
  { path: '', component: ProfessorListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ProfessorFormComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ProfessorFormComponent, canActivate: [AuthGuard] },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ProfessorRoutingModule {}
