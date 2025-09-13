import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { AuthGuard } from '../core/guards/auth-guard';

const routes: Routes = [
  { path: '', component: GradeListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: GradeFormComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: GradeFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule {}
