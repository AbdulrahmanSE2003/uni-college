import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/changePassword";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
