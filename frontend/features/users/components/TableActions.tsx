"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import TableFilters from "@/components/shared/TableFilters";
import { roleOptions, statusOptions } from "@/lib/constants";

const TableActions = ({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
}: {
  search: string;
  setSearch: (e: string) => void;
  role: string;
  setRole: (r: string) => void;
  status: string;
  setStatus: (s: string) => void;
}) => {
  return (
    <div className="flex items-center justify-end gap-2 w-1/2 relative">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          className="pl-9 bg-background border-border"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <TableFilters
        value={role}
        onValueChange={setRole}
        placeholder="Role"
        options={roleOptions}
      />
      <TableFilters
        value={status}
        onValueChange={setStatus}
        placeholder="status"
        options={statusOptions}
      />
    </div>
  );
};

export default TableActions;
