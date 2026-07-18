// lib/create-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export const createMutation = <T>(
  mutationFn: (payload: T) => Promise<unknown>,
  invalidateKey?: string,
) => {
  return () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn,
      onSuccess: () => {
        if (invalidateKey) qc.invalidateQueries({ queryKey: [invalidateKey] });
        toast.success("Done successfully.");
      },
      onError: (e) => toast.error(getErrorMessage(e)),
    });
  };
};
