import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../api/subjects";
import { Role } from "@/types/common.types";

export const useGetSubjects = (role: Role | undefined) => {
  return useQuery({
    queryKey: ["subjects", role],
    queryFn: () => getSubjects(role!),
    enabled: !!role,
  });
};
