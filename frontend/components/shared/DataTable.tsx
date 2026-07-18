// components/shared/DataTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { ColumnConfig } from "@/types/column-config.types";
import ActionCell from "@/components/shared/ActionCell";

type DataTableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  getRowId: (row: T) => string;
  renderActions?: (row: T) => React.ReactNode; // optional, مش كل جدول محتاج actions
};

export function DataTable<T>({
  columns,
  data,
  getRowId,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="rounded-2xl border border-border w-full">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
            {renderActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowId(row)}>
              {columns.map((col) => (
                <td key={col.header} className="p-4 align-middle">
                  {col.render(row)}
                </td>
              ))}
              {renderActions && <td className="p-4">{renderActions(row)}</td>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
