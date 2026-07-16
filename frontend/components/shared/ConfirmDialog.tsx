"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { ReactElement } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  trigger: ReactElement;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "default" | "destructive";
  onConfirm: () => Promise<unknown>;
}

const ConfirmDialog = ({
  trigger,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  loading = false,
  variant = "destructive",
  onConfirm,
}: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      setOpen(false);
    } catch {
      // Keep dialog open if mutation fails
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={trigger} />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={
              variant === "destructive" ? "text-destructive" : undefined
            }
          >
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            variant={variant}
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Please wait...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
