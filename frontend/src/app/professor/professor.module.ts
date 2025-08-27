import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

@NgModule({
  declarations: [ProfessorListComponent, ProfessorFormComponent],
  imports: [CommonModule, FormsModule, ProfessorRoutingModule]
})
export class ProfessorModule {}
