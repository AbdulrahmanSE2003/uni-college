import { useQuery } from "@tanstack/react-query";
import { getAllGrades } from "../api/getAllGrades";

export const useGetAllGrades = () => {
  return useQuery({
    queryKey: ["grades"],
    queryFn: getAllGrades,
  });
};
