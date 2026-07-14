export type UserRole = "admin" | "teacher" | "student";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isFirstLogin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  auth: {
    user: User;
    token: string;
  };
}

export interface LogoutResponse {
  status: true;
}
