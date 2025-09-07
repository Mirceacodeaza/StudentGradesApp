import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'professors',
    loadChildren: () =>
      import('./professor/professor.module').then(m => m.ProfessorModule)
  }, 
  { path: 'student',
     loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  { 
    path: '**', redirectTo: 'auth/login' 
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

