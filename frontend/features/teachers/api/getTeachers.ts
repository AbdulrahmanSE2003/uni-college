import api from "@/lib/axios";
import { TeacherResponse } from "../types/teacher.types";

export const getTeachers = async () => {
  const response = await api.get<TeacherResponse>("/admin/teacher");
  return response.data;
};
