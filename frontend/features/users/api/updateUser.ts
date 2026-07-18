import api from "@/lib/axios";
import { AddUpdateUserPayload, UpdateUserResponse } from "../types/users.types";

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: AddUpdateUserPayload;
}) => {
  const response = await api.patch<UpdateUserResponse>(`/users/${id}`, data);

  return response.data;
};
