import { Role } from "./common.types";
import { StudentProfile } from "./student.types";
import { TeacherProfile } from "./teacher.types";

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  gender: "male" | "female" | "n/a";
  isActive: boolean;
  isFirstLogin: boolean;
  createdAt: string;
  updatedAt: string;
  passwordChangedAt?: string;
}

export interface StudentUser extends BaseUser {
  role: "student";
  student: StudentProfile;
}

export interface TeacherUser extends BaseUser {
  role: "teacher";
  teacher: TeacherProfile;
}

export interface AdminUser extends BaseUser {
  role: "admin";
}

export type User = StudentUser | TeacherUser | AdminUser;
