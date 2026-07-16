"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTableCell } from "@/components/shared/CustomTableCell";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user.types";

const UsersTable = ({
  users,
  search,
  setSearch,
}: {
  users: User[];
  search: string;
  setSearch: (e: string) => void;
}) => {
  return (
    <>
      {/* 3. Utility Search Bar */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      <div className={`rounded-2xl border border-border`}>
        <Table>
          <TableCaption>List of users.</TableCaption>
          <TableHeader className={`bg-muted`}>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <CustomTableCell
                  className="font-medium capitalize"
                  value={row.name}
                ></CustomTableCell>
                <CustomTableCell value={row.email} type="copy" />
                <CustomTableCell value={row.phone} type="copy">
                  {row.phone}
                </CustomTableCell>
                <CustomTableCell value={row.gender} />
                <CustomTableCell
                  value={row.role}
                  type="badge"
                  badgeVariant={
                    row.role === "admin"
                      ? "destructive"
                      : row.role === "teacher"
                        ? "secondary"
                        : "default"
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UsersTable;
