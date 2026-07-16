import { User } from "@/types/user.types";

export interface Stats {
  totalUsers: number;
  admins: number;
  teachers: number;
  students: number;
  active: number;
  inactive: number;
}

export interface UsersResponse {
  status: boolean;
  page: number;
  pages: number;
  stats: Stats;
  results: number;
  total: number;
  users: User[];
}
