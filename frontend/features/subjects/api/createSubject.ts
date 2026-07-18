// features/subjects/hooks/use-create-subject.ts
import { SubjectPayload } from "../types/subject.types";
import api from "@/lib/axios";

export const createSubject = async (payload: SubjectPayload) => {
  const response = await api.post("/subjects", payload);
  return response.data;
};
