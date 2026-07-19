// features/subjects/hooks/subject-hooks.ts
import { createMutation } from "@/lib/create-mutation";
import { SubjectPayload } from "../types/subject.types";
import api from "@/lib/axios";

export const useUpdateSubject = createMutation<{
  id: string;
  data: SubjectPayload;
}>(
  ({ id, data }) => api.patch(`/subjects/${id}`, data),
  "subjects",
  "Subject updated successfully.",
);

export const useDeleteSubject = createMutation<string>(
  (id) => api.delete(`/subjects/${id}`),
  "subjects",
  "Subject deleted successfully.",
);
