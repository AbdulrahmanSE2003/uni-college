import api from "@/lib/axios";
import { UsersResponse } from "../types/users.types";

export const getUsers = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<UsersResponse>("/users", {
    params,
  });

  return response.data;
};
