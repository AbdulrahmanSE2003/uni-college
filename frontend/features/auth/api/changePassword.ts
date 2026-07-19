import api from "@/lib/axios";
import {
  ChangePasswordPayload,
  AuthMessageResponse,
} from "../types/auth.types";

export const changePassword = async (data: ChangePasswordPayload) => {
  const response = await api.patch<AuthMessageResponse>(
    "/users/change-password",
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
