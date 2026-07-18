"use client";

import { ReactElement } from "react";
import { toast } from "sonner";

import FormDialog from "@/components/shared/FormDialog";
import { getErrorMessage } from "@/lib/get-error-message";
import { User } from "@/types/user.types";

import { useUpdateUser } from "../hooks/use-update-user";
import { AddUpdateUserPayload } from "../types/users.types";
import UserForm from "./UserForm";

interface EditUserDialogProps {
  user: User;
  trigger: ReactElement;
}

const EditUserDialog = ({ user, trigger }: EditUserDialogProps) => {
  const updateMutation = useUpdateUser();

  const handleSubmit = async (data: AddUpdateUserPayload) => {
    await updateMutation.mutateAsync(
      { id: user._id, data },
      {
        onSuccess: () => toast.success("User updated successfully."),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <FormDialog
      title="Update User"
      description="Modify existing data of this user accurately."
      trigger={trigger}
    >
      {({ close }) => (
        <UserForm
          defaultValues={user}
          isPending={updateMutation.isPending}
          onSubmit={handleSubmit}
          close={close}
        />
      )}
    </FormDialog>
  );
};

export default EditUserDialog;
