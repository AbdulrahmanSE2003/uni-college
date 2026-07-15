export type Role = "admin" | "teacher" | "student";

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data: T;
}
