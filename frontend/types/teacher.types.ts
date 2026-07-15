import { Grade, Subject } from "./student.types";

export interface TeacherProfile {
  _id: string;
  userId: string;

  employeeId: string;
  grades: Grade[];

  subjectIds: Subject[];

  joiningDate: string;
  createdAt: string;
  updatedAt: string;
}
