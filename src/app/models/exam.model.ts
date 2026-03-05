export interface Exam {
  id?: number;
  subjectId: number;
  studentId: number;
  examDate: Date | string;
  grade: number;
}