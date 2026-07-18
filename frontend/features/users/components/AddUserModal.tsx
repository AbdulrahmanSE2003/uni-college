"use client";

import AddModal from "@/components/shared/AddModal";
import DynamicForm from "@/components/shared/DynamicForm";
import { useCreateStudent } from "../hooks/use-create-student";
import { createStudentSchema } from "@/features/students/schemas/student.schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";
import { StudentPayload } from "@/features/users/types/student.types";
import { FieldConfig } from "@/types/field-config.types";
import { genderOptions } from "@/lib/constants";

const studentFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "gender", label: "Gender", type: "select", options: genderOptions },
  { name: "gradeId", label: "Grade", type: "text" },
 ];

const AddUserModal = () => {
  const createMutation = useCreateStudent();

  const handleSubmit = async (data: StudentPayload) => {
    await createMutation.mutate(data, {
      onSuccess: () => toast.success("User created successfully."),
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
          fields={studentFields}
          schema={createStudentSchema}
          onSubmit={handleSubmit}
          isPending={createMutation.isPending}
          defaultValues={{
            name: "",
            email: "",
            gender: "male",
            phone: "",
            gradeId: "",
          }}
        />
      )}
    </AddModal>
  );
};

export default AddUserModal;
