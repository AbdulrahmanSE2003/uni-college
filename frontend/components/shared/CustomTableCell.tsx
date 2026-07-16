"use client";

import { ReactNode, useState } from "react";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export type CellType = "text" | "badge" | "copy" | "link" | "custom";

interface TableCellDynamicProps {
  type?: CellType;
  value?: string;
  href?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: ReactNode; // For the "custom" type
  className?: string;
}

export const CustomTableCell = ({
  type = "text",
  value = "",
  href,
  badgeVariant = "secondary",
  children,
  className,
}: TableCellDynamicProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    setIsCopied(true);
    e.stopPropagation();
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast("Copied!", {
      description: `Text copied to clipboard successfully.`,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <TableCell className={`align-middle ${className || ""}`}>
      {type === "text" && <span className="text-sm">{value || "N/A"}</span>}

      {type === "badge" && (
        <Badge variant={badgeVariant} className="capitalize">
          {value || "N/A"}
        </Badge>
      )}

      {type === "copy" && (
        <div className="flex items-center gap-2 group max-w-max">
          <span className="text-sm">{value || "N/A"}</span>
          {value !== "N/A" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {isCopied ? (
                <CopyCheck className={`size-4`} />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          )}
        </div>
      )}

      {type === "link" && href && (
        <Link
          href={href}
          className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium"
        >
          {value || "N/A"}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      )}

      {type === "custom" && children}
    </TableCell>
  );
};
