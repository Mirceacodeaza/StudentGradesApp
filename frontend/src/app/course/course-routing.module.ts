import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: CourseFormComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: CourseFormComponent, canActivate: [AuthGuard] },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CourseRoutingModule {}
