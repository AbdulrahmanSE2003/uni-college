import api from "@/lib/axios";
import { ApiResponse } from "@/types/common.types";
import { GradeResponse } from "../types/grades.types";

export const getAllGrades = async () => {
  const response = await api.get<GradeResponse>("/grades");

  return response.data;
};
