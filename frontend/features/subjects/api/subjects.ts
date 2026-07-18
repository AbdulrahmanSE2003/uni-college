import api from "@/lib/axios";
import { SubjectResponse } from "../types/subject.types";
import { Role } from "@/types/common.types";
import { SubjectsParams } from "../hooks/use-subjects";

export const getSubjects = async (role: Role, params: SubjectsParams) => {
  if (role === "admin") {
    const response = await api.get<SubjectResponse>(`/subjects`, {
      params,
    });
    return response.data;
  } else {
    const response = await api.get<SubjectResponse>("/subjects/my-subjects");
    return response.data;
  }
};
