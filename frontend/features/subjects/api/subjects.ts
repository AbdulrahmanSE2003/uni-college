import api from "@/lib/axios";
import { SubjectResponse } from "../types/subject.types";
import { Role } from "@/types/common.types";

export const getSubjects = async (role: Role) => {
  const response = await api.get<SubjectResponse>(
    role === "admin" ? "/subjects" : "/subjects/my-subjects",
  );

  return response.data;
};
