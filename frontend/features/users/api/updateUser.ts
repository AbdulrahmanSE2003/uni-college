import api from "@/lib/axios";
import { UpdateUserPayload, UpdateUserResponse } from "../types/users.types";

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateUserPayload;
}) => {
  const response = await api.patch<UpdateUserResponse>(`/users/${id}`, data);

  return response.data;
};
