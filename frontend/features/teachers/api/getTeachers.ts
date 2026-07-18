import { UsersResponse } from "@/features/users/types/users.types";
import api from "@/lib/axios";

export const getTeachers = async () => {
  const response = await api.get<UsersResponse>("/users?role=teacher");
  return response.data;
};
