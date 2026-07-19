import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ConfirmDialog from "./ConfirmDialog";

interface TableDeleteActionProps {
  onDelete: () => Promise<void>;
  isDeletePending: boolean;
  canDelete?: boolean;
}

const TableDeleteAction = ({
  isDeletePending,
  onDelete,
  canDelete = true,
}: TableDeleteActionProps) => {
  return (
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
  );
};

export default TableDeleteAction;
