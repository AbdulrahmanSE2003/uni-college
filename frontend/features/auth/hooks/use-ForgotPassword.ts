import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forgotPassword";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
