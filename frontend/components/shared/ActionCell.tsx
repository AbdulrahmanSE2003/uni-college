// components/shared/ActionCell.tsx
"use client";

import { Trash2, PenBoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { ReactNode } from "react";
import { CustomTableCell } from "./CustomTableCell";

interface ActionCellProps {
  onDelete: () => Promise<void>;
  isDeletePending: boolean;
  editDialog: ReactNode;
  canDelete?: boolean;
}

const ActionCell = ({
  onDelete,
  isDeletePending,
  editDialog,
  canDelete = true,
}: ActionCellProps) => {
  return (
    <CustomTableCell>
      <div className="flex items-center gap-2">
        {editDialog}

        <ConfirmDialog
          trigger={
            <Button
              disabled={!canDelete}
              className="disabled:cursor-not-allowed"
              variant="destructive"
              size="icon-sm"
            >
              <Trash2 />
            </Button>
          }
          title="Are you sure?"
          description="This action cannot be undone."
          confirmText="Delete"
          loading={isDeletePending}
          onConfirm={onDelete}
        />
      </div>
    </CustomTableCell>
  );
};

export default ActionCell;
