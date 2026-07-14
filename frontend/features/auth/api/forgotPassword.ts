import api from "@/lib/axios";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/forgotPassword";

export const forgotPassword = async (data: ForgotPasswordPayload) => {
  const response = await api.post<ForgotPasswordResponse>(
    "/users/forgot-password",
    data,
  );

  return response.data;
};
