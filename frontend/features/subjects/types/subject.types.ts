import { Subject } from "@/types/student.types";

export interface SubjectResponse {
  status: boolean;
  results: number;
  subjects: Subject[];
}
