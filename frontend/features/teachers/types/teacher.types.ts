import { TeacherProfile } from "@/types/teacher.types";

interface Stats {
  totalTeachers: 2;
  totalSubjects: 2;
  totalGrades: 2;
  totalQualifications: 0;
}

export interface TeacherResponse {
  status: boolean;
  teachers: {
    results: number;
    page: number;
    totalPages: number;
    total: number;
    teachers: TeacherProfile[];
    stats: Stats;
  };
}
