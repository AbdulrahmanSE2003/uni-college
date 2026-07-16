export type Role = "admin" | "teacher" | "student";

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  results?: number;
  data: T;
}

export interface DeleteResponse {
  status: boolean;
  message: string;
}
