import api from "@/lib/axios";
import { UsersResponse } from "../types/users.types";
import { UsersParams } from "../hooks/use-users";

export const getUsers = async (params?: UsersParams) => {
  const response = await api.get<UsersResponse>("/users", {
    params,
  });

  return response.data;
};
