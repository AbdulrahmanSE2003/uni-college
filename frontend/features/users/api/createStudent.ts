import api from "@/lib/axios";
import { StudentUser } from "@/types/user.types";

export const createStudent = async () => {
  const response = await api.post<StudentUser>("/admin/student");

  return response.data;
};
