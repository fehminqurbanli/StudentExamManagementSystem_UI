import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubjectService } from '../../services/subject';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-ders',
  standalone: true,
  imports: [
    FormsModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './subject.html'
})
export class SubjectComponent {
  private subjectService = inject(SubjectService);
  private snack = inject(MatSnackBar);

  columns = ['id', 'code', 'name', 'class', 'teacherName', 'teacherSurname', 'emeliyyat'];
  subjects = computed(() => this.subjectService.getAll());

  new: Subject = { id:0, code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };

  add() {
    if (!this.new.code || !this.new.name) {
      this.snack.open('Kod və Ad mütləq doldurulmalıdır!', '✕', { duration: 3000 });
      return;
    }
    this.subjectService.add({ ...this.new });
    this.new = { id:0, code: '', name: '', class: 0, teacherName: '', teacherSurname: '' };
    this.snack.open('✓ Dərs əlavə edildi', '', { duration: 2000 });
  }

  delete(id: number) {
    this.subjectService.delete(id);
    this.snack.open('Dərs silindi', '', { duration: 2000 });
  }
}