import api from "@/lib/axios";
import {
  ResetPasswordPayload,
  AuthMessageResponse,
} from "../types/auth.types";

type ResetPasswordRequest = {
  token: string;
  data: ResetPasswordPayload;
};

export async function resetPassword({ token, data }: ResetPasswordRequest) {
  const response = await api.patch<AuthMessageResponse>(
    `/users/reset-password/${token}`,
    data,
  );

  return response.data;
}
