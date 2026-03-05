import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubjectService } from '../../services/subject';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    FormsModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatSnackBarModule, MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './subject.html',
  styleUrls: ['./subject.css']
})
export class SubjectComponent implements OnInit {
  private subjectService = inject(SubjectService);
  private snack = inject(MatSnackBar);

  columns = ['code', 'name', 'class', 'teacherName', 'teacherSurname', 'actions'];
  subjects = signal<Subject[]>([]);
  loading = signal(false);
  new: Subject = { code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.subjectService.getAll().subscribe({
      next: (data) => {
        this.subjects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snack.open('API ilə əlaqə xətası!', '✕', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

selectedId: number | null = null;

 add() {

  if (!this.new.code || !this.new.name) {
    this.snack.open('Kod və Ad doldurulmalıdır!', '✕', { duration: 3000 });
    return;
  }

  if (this.selectedId !== null) {
    this.subjectService.update(this.selectedId, this.new).subscribe({
      next: () => {
        this.snack.open('✓ Dərs yeniləndi', '', { duration: 2000 });
        this.selectedId = null;
        this.new = { code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };
        this.load();
      },
      error: () => this.snack.open('Yeniləmə xətası!', '✕', { duration: 3000 })
    });
  } 
  else {
    this.subjectService.add(this.new).subscribe({
      next: () => {
        this.snack.open('✓ Dərs əlavə edildi', '', { duration: 2000 });
        this.new = { code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };
        this.load();
      },
      error: () => this.snack.open('Xəta baş verdi!', '✕', { duration: 3000 })
    });
  }
}

  delete(id: number) {
    this.subjectService.delete(id).subscribe({
      next: () => {
        this.snack.open('Dərs silindi', '', { duration: 2000 });
        this.load();
      },
      error: () => this.snack.open('Silmə xətası!', '✕', { duration: 3000 })
    });
  }

  edit(subject: Subject) {
  this.selectedId = subject.id!;
  this.new = {
    code: subject.code,
    name: subject.name,
    class: subject.class,
    teacherName: subject.teacherName,
    teacherSurname: subject.teacherSurname
  };
}

ignore() {
  this.selectedId = null;
  this.new = { code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };
}
}