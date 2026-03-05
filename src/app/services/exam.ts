import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/exams`;

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.url);
  }

  add(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.url, exam);
  }

  update(id: number, exam: Exam): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, exam);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}