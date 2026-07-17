"use client";

import { PenBoxIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomTableCell } from "@/components/shared/CustomTableCell";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

import { useDeleteUser } from "@/features/users/hooks/use-delete-user";
import EditUserDialog from "@/features/users/components/EditUserDialog";
import { User } from "@/types/user.types";

interface ActionCellProps<T extends { _id: string; isActive: boolean }> {
  row: T;
  user: User;
}

const ActionCell = <T extends { _id: string; isActive: boolean }>({
  row,
  user,
}: ActionCellProps<T>) => {
  const deleteUserMutation = useDeleteUser();

  return (
    <CustomTableCell
      value={row.isActive ? "Active" : "Inactive"}
      type="custom"
      badgeVariant={row.isActive ? "success" : "destructive"}
      className="flex items-center gap-2"
    >
      <EditUserDialog
        user={user}
        trigger={
          <Button variant="warning" size="icon-sm">
            <PenBoxIcon />
          </Button>
        }
      />

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
