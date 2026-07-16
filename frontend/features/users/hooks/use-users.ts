import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";

export const useUsers = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};
