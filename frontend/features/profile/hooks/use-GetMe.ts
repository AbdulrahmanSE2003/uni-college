import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
