import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../api/subjects";
import { Role } from "@/types/common.types";

export interface SubjectsParams {
  search?: string;
  page?: number;
  gradeId?: string;
  limit?: number;
}

export const useGetSubjects = (
  role: Role | undefined,
  params?: SubjectsParams,
) => {
  return useQuery({
    queryKey: ["subjects", role, params],
    queryFn: () => getSubjects(role!, params!),
    placeholderData: (previousData) => previousData,
    enabled: !!role,
  });
};
