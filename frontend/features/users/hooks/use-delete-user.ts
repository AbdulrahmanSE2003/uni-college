import { createMutation } from "@/lib/create-mutation";
import api from "@/lib/axios";

export const useDeleteUser = createMutation<string>(
  (id) => api.delete(`/users/${id}`),
  "users",
  "User deleted successfully.",
);
