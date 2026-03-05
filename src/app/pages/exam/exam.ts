import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExamService } from '../../services/exam';
import { StudentService } from '../../services/student';
import { SubjectService } from '../../services/subject';
import { Exam } from '../../models/exam.model';
import { Student } from '../../models/student.model';
import { Subject } from '../../models/subject.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    FormsModule, DatePipe,
    MatTableModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatCardModule, MatSnackBarModule, MatTooltipModule,
    MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule,
    CommonModule, FormsModule
  ],
  templateUrl: './exam.html',
  styleUrls: ['./exam.css']
})
export class ExamComponent implements OnInit {
  private examService = inject(ExamService);
  private studentService = inject(StudentService);
  private subjectService = inject(SubjectService);
  private snack = inject(MatSnackBar);

  columns = ['subject', 'student', 'examDate', 'grade', 'actions'];
  exams = signal<Exam[]>([]);
  students = signal<Student[]>([]);
  subjects = signal<Subject[]>([]);
  loading = signal(false);
  selectedId: number | null = null;

  new: Exam = { subjectId: 0, studentId: 0, examDate: new Date(), grade: 0 };

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    // Studentləri və Subjectləri selectbox üçün yüklə
    this.studentService.getAll().subscribe(data => this.students.set(data));
    this.subjectService.getAll().subscribe(data => this.subjects.set(data));
    this.load();
  }

  load() {
    this.loading.set(true);
    this.examService.getAll().subscribe({
      next: (data) => {
        this.exams.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snack.open('API ilə əlaqə xətası!', '✕', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  add() {
    if (!this.new.subjectId || !this.new.studentId) {
      this.snack.open('Fənn və Şagird seçilməlidir!', '✕', { duration: 3000 });
      return;
    }

    if (this.selectedId !== null) {
      this.examService.update(this.selectedId, this.new).subscribe({
        next: () => {
          this.snack.open('✓ İmtahan yeniləndi', '', { duration: 2000 });
          this.reset();
          this.load();
        },
        error: () => this.snack.open('Yeniləmə xətası!', '✕', { duration: 3000 })
      });
    } else {
      this.examService.add(this.new).subscribe({
        next: () => {
          this.snack.open('✓ İmtahan əlavə edildi', '', { duration: 2000 });
          this.reset();
          this.load();
        },
        error: () => this.snack.open('Xəta baş verdi!', '✕', { duration: 3000 })
      });
    }
  }

  edit(exam: Exam) {
    this.selectedId = exam.id!;
    this.new = {
      subjectId: exam.subjectId,
      studentId: exam.studentId,
      examDate: exam.examDate,
      grade: exam.grade
    };
  }

  delete(id: number) {
    this.examService.delete(id).subscribe({
      next: () => {
        this.snack.open('İmtahan silindi', '', { duration: 2000 });
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
    this.new = { subjectId: 0, studentId: 0, examDate: new Date(), grade: 0 };
  }

  // Cədvəldə göstərmək üçün köməkçi metodlar
  getSubjectName(id: number): string {
    return this.subjects().find(s => s.id === id)?.name || '-';
  }

  getStudentName(id: number): string {
    const s = this.students().find(s => s.id === id);
    return s ? `${s.name} ${s.surname}` : '-';
  }

  gradeClass(grade: number): string {
  if (grade >= 7) return 'grade-high';
  if (grade >= 4) return 'grade-mid';
  return 'grade-low';
}

  grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}