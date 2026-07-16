"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTableCell } from "@/components/shared/CustomTableCell";

import { User } from "@/types/user.types";
import ActionCell from "@/components/shared/ActionCell";

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <div className={`rounded-4xl border border-border w-full`}>
      <Table className={`rounded-4xl`}>
        <TableHeader className={`bg-muted`}>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
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
              <CustomTableCell
                value={row.isActive ? "Active" : "inActive"}
                type="badge"
                badgeVariant={row.isActive ? "success" : "destructive"}
              />
              <ActionCell row={row} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
