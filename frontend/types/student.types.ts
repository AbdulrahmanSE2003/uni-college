export interface Grade {
  _id: string;
  name: string;
  academicYear?: string;
}

export interface Subject {
  _id: string;
  title: string;
}

export interface StudentProfile {
  _id: string;
  userId: string;
  academicId: string;
  gradeId: Grade;
  subjectIds: Subject[];
  gpa: number;
  createdAt: string;
  updatedAt: string;
}
