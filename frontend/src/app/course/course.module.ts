import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

@NgModule({
  declarations: [CourseListComponent, CourseFormComponent],
  imports: [CommonModule, FormsModule, CourseRoutingModule]
})
export class CourseModule {}
