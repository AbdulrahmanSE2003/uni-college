import { Grade, Subject } from "./student.types";

export interface TeacherProfile {
  _id: string;
  userId: string | { _id: string; name: string };

  employeeId: string;
  grades: Grade[];

  subjectIds: Subject[];

  qualification: string;

  joiningDate: string;
  createdAt: string;
  updatedAt: string;
}
