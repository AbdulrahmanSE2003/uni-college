import api from "@/lib/axios";
import { MeResponse } from "@/types/auth.types";

export const getMe = async () => {
  const response = await api.get<MeResponse>("/users/me", {
    withCredentials: true,
  });

  return response.data;
};
