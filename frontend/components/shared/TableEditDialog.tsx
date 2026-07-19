import { ReactElement, ReactNode } from "react";
import FormDialog from "./FormDialog";
import { Button } from "../ui/button";
import { PenBoxIcon } from "lucide-react";

interface TableEditDialogProps {
  title: string;
  description?: string;
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}

const TableEditDialog = ({
  title,
  description,
  children,
}: TableEditDialogProps) => {
  return (
    <FormDialog
      title={title || "Edit"}
      trigger={
        <Button variant="warning" size="icon-sm">
          <PenBoxIcon />
        </Button>
      }
      description={description}
    >
      {children}
    </FormDialog>
  );
};

export default TableEditDialog;
