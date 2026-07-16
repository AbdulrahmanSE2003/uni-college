import api from "@/lib/axios";
import { DeleteResponse } from "@/types/common.types";

export const deleteUser = async (id: string) => {
  const response = await api.delete<DeleteResponse>(`/users/${id}`);

  return response.data;
};
