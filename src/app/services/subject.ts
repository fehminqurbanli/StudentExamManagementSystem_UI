import { Injectable, signal } from '@angular/core';
import { Subject } from '../models/subject.model';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private subjects = signal<Subject[]>([]);

  getAll() { return this.subjects(); }

  add(subject: Subject) {
    this.subjects.update(list => [...list, subject]);
  }

  delete(id: number) {
    this.subjects.update(list => list.filter(d => d.id !== id));
  }

  getById(id: number) {
    return this.subjects().find(d => d.id === id);
  }
}