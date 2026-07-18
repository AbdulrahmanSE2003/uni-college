"use client";

import { ReactNode } from "react";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Copy from "./Copy";

export type CellType = "text" | "badge" | "copy" | "link" | "custom";

interface TableCellDynamicProps {
  type?: CellType;
  value?: string;
  href?: string;
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success";
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
          {value !== "N/A" && <Copy value={value} />}
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
