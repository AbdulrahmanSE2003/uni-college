import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/deleteUser";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("User deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
