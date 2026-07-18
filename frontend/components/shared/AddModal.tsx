import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ReactNode, useState } from "react";

const AddModal = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={``}>
            <PlusCircle />
            Add User
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {typeof children === "function"
          ? children({ close: () => setOpen(false) })
          : children}
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
