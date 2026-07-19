import { createMutation } from "@/lib/create-mutation";
import { UpdateUserPayload } from "../types/users.types";
import api from "@/lib/axios";

export const useUpdateUser = createMutation<{
  id: string;
  data: UpdateUserPayload;
}>(
  ({ id, data }) => api.patch(`/users/${id}`, data),
  "users",
  "User updated successfully.",
);
