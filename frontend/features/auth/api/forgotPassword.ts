import api from "@/lib/axios";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/auth.types";

export const forgotPassword = async (data: ForgotPasswordPayload) => {
  const response = await api.post<ForgotPasswordResponse>(
    "/users/forgot-password",
    data,
  );

  return response.data;
};
