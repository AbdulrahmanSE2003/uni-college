import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../api/getTeachers";

export const useGetAllTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};
