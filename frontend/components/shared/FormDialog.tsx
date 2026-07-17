"use client";

import { ReactElement, ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  title: string;
  description?: string;
  trigger: ReactElement;
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}

const FormDialog = ({ title, description, trigger, children }: FormDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />

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

export default FormDialog;
