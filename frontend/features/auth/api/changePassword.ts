import api from "@/lib/axios";
import {
  changePasswordPayload,
  ChangePasswordResponse,
} from "../types/changePassword.types";

export const changePassword = async (data: changePasswordPayload) => {
  const response = await api.patch<ChangePasswordResponse>(
    "/users/change-password",
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
