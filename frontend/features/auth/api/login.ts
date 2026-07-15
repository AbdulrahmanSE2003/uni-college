import api from "@/lib/axios";
import { LoginPayload, LoginResponse } from "@/types/auth.types";

export const login = async (data: LoginPayload) => {
  const response = await api.post<LoginResponse>("users/login", data);

  return response.data;
};
