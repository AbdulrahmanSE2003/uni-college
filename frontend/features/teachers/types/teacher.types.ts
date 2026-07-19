import { TeacherProfile } from "@/types/teacher.types";

export interface TeacherResponse {
  status: boolean;
  results: number;
  teachers: TeacherProfile[];
}
