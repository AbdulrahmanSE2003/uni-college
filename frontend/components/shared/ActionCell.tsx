"use client";

import { PenBoxIcon, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomTableCell } from "@/components/shared/CustomTableCell";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

import { useDeleteUser } from "@/features/users/hooks/use-delete-user";
import FormDialog from "./FormDialog";
import { useUpdateUser } from "@/features/users/hooks/use-update-user";
import UserForm from "@/features/users/components/UserForm";
import { User } from "@/types/user.types";
import { useState } from "react";

interface ActionCellProps<T extends { _id: string; isActive: boolean }> {
  row: T;
}

const ActionCell = <T extends { _id: string; isActive: boolean; user: User }>({
  row,
}: ActionCellProps<T>) => {
  const deleteUserMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  return (
    <CustomTableCell
      value={row.isActive ? "Active" : "Inactive"}
      type="custom"
      badgeVariant={row.isActive ? "success" : "destructive"}
      className="flex items-center gap-2"
    >
      <FormDialog
        trigger={
          <Button variant="warning" size="icon-sm">
            <PenBoxIcon />
          </Button>
        }
        title="Edit User"
      >
        <UserForm
          close={() => {}}
          defaultValues={row.user}
          isPending={updateMutation.isPending}
          onSubmit={() => updateMutation.mutateAsync(row._id)}
        />
      </FormDialog>

      <ConfirmDialog
        trigger={
          <Button
            disabled={!row.isActive}
            className={`disabled:cursor-not-allowed`}
            variant="destructive"
            size="icon-sm"
          >
            <Trash2 />
          </Button>
        }
        title="Delete User?"
        description="This action will deactivate this user. You can reactivate them later if needed."
        confirmText="Delete"
        loading={deleteUserMutation.isPending}
        onConfirm={() => deleteUserMutation.mutateAsync(row._id)}
      />
    </CustomTableCell>
  );
};

export default ActionCell;
