import { TeacherProfile } from "./teacher.types";

export interface Grade {
  _id: string;
  name: string;
  academicYear?: string;
}

interface Material {
  title: string;
  url: string;
}

export interface Subject {
  _id: string;
  teacherId: TeacherProfile;
  name: string;
  materials: Material[];
  gradeId: string;
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
