import { Subject } from "@/types/student.types";

interface Stats {
  totalSubjects: number;
  totalMaterials: number;
  totalGrades: number;
  totalTeachers: number;
}

export interface SubjectResponse {
  status: boolean;
  results: number;
  subjects: { stats: Stats; subjects: Subject[] };
}

export type SubjectPayload = {
  name: string;
  teacherId?: string;
  gradeId: string;
};
