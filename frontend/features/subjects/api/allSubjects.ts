import api from "@/lib/axios";
import { SubjectResponse } from "../types/subject.types";

export const getSubjects = async () => {
  const response = await api.get<SubjectResponse>("/subjects/");

  return response.data;
};
