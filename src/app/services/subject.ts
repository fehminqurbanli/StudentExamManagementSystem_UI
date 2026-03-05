import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/subjects`;

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url);
  }

  add(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.url, subject);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getByKod(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.url}/${id}`);
  }
}