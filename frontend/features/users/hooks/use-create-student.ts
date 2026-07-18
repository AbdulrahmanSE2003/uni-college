import { useMutation } from "@tanstack/react-query";
import { createStudent } from "../api/createStudent";

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: createStudent,
  });
};
