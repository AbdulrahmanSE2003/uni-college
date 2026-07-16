import { User } from "@/types/user.types";

export interface UsersResponse {
  status: boolean;
  results: number;
  users: User[];
}
