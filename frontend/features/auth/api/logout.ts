import api from "@/lib/axios";
import { LogoutResponse } from "@/types/auth.types";

export const logout = async () => {
  const response = await api.post<LogoutResponse>("users/logout");

  return response.data;
};
