import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";

export interface UsersParams {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const useUsers = (params?: UsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};
