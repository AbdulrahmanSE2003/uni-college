// features/subjects/config/subject-fields.ts
import { FieldConfig } from "@/types/field-config.types";

export const subjectFields: FieldConfig[] = [
  { name: "title", label: "Subject", type: "text" },
  { name: "teacherId", label: "Teacher", type: "select" },
  { name: "gradeId", label: "Grade", type: "select" },
];
