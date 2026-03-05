import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' },
  {
    path: 'subjects',
    loadComponent: () => import('./pages/subject/subject').then(m => m.SubjectComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./pages/student/student').then(m => m.Student)
  },
  {
    path: 'exam',
    loadComponent: () => import('./pages/exam/exam').then(m => m.Exam)
  }
];