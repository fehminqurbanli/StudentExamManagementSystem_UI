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
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    FormsModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatSnackBarModule, MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent implements OnInit {
  private studentService = inject(StudentService);
  private snack = inject(MatSnackBar);

  columns = ['studentNumber', 'name', 'surname', 'class', 'actions'];
  students = signal<Student[]>([]);
  loading = signal(false);
  selectedId: number | null = null;

  new: Student = { studentNumber: 0, name: '', surname: '', class: 0 };

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snack.open('API ilə əlaqə xətası!', '✕', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  add() {
    if (!this.new.studentNumber || !this.new.name) {
      this.snack.open('Nömrə və Ad doldurulmalıdır!', '✕', { duration: 3000 });
      return;
    }

    if (this.selectedId !== null) {
      this.studentService.update(this.selectedId, this.new).subscribe({
        next: () => {
          this.snack.open('✓ Şagird yeniləndi', '', { duration: 2000 });
          this.reset();
          this.load();
        },
        error: () => this.snack.open('Yeniləmə xətası!', '✕', { duration: 3000 })
      });
    } else {
      this.studentService.add(this.new).subscribe({
        next: () => {
          this.snack.open('✓ Şagird əlavə edildi', '', { duration: 2000 });
          this.reset();
          this.load();
        },
        error: () => this.snack.open('Xəta baş verdi!', '✕', { duration: 3000 })
      });
    }
  }

  edit(student: Student) {
    this.selectedId = student.id!;
    this.new = {
      studentNumber: student.studentNumber,
      name: student.name,
      surname: student.surname,
      class: student.class
    };
  }

  delete(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => {
        this.snack.open('Şagird silindi', '', { duration: 2000 });
        this.load();
      },
      error: () => this.snack.open('Silmə xətası!', '✕', { duration: 3000 })
    });
  }

  ignore() {
    this.reset();
  }

  private reset() {
    this.selectedId = null;
    this.new = { studentNumber: 0, name: '', surname: '', class: 0 };
  }
}