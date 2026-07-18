import api from "@/lib/axios";
import { StudentUser } from "@/types/user.types";
import { StudentPayload } from "../types/student.types";

export const createStudent = async (data: StudentPayload) => {
  const response = await api.post<StudentUser>("/admin/student", data);

  return response.data;
};
