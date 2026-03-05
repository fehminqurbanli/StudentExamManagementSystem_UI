import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/students`;

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  update(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}