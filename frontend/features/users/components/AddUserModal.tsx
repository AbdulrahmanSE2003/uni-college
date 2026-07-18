"use client";

import AddModal from "@/components/shared/AddModal";
import DynamicForm from "@/components/shared/DynamicForm";
import { useCreateStudent } from "../hooks/use-create-student";
import { createStudentSchema } from "@/features/students/schemas/student.schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";
import { StudentPayload } from "@/features/users/types/student.types";

const AddUserModal = () => {
  const createMutation = useCreateStudent();

  const handleSubmit = async (data: StudentPayload) => {
    await createMutation.mutate(data, {
      onSuccess: () => toast.success("User updated successfully."),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };
  return (
    <AddModal
      title="Create User"
      description="Here you can create any kind of users."
    >
      {({ close }) => (
        <DynamicForm
          close={close}
          payload={createStudentSchema}
          onSubmit={handleSubmit}
          isPending={createMutation.isPending}
          Schema={createStudentSchema}
          defaultValues={{
            name: "",
            email: "",
            gender: "Male",
            phone: "",
            gradeId: "",
          }}
        />
      )}
    </AddModal>
  );
};

export default AddUserModal;
