import api from "@/lib/axios";
import {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/changePassword.types";

type ResetPasswordRequest = {
  token: string;
  data: ResetPasswordPayload;
};

export async function resetPassword({ token, data }: ResetPasswordRequest) {
  const response = await api.patch<ResetPasswordResponse>(
    `/users/reset-password/${token}`,
    data,
  );

  return response.data;
}
