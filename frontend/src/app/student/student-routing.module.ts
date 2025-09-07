import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AuthGuard } from '../core/guards/auth-guard';

const routes: Routes = [
  { path: '', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: StudentFormComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: StudentFormComponent, canActivate: [AuthGuard] },
  { path: ':id', component: StudentDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
