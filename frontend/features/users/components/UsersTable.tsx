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
import { Button } from "@/components/ui/button";
import { PenBoxIcon, Trash2 } from "lucide-react";
import EditUserDialog from "./EditUserDialog";
import { useDeleteUser } from "../hooks/use-delete-user";
import TableDeleteAction from "@/components/shared/TableDeleteAction";

const UsersTable = ({ users }: { users: User[] }) => {
  const deleteMutation = useDeleteUser();

  return (
    <div className={`rounded-2xl border border-border w-full`}>
      <Table className={``}>
        <TableHeader className={`bg-muted`}>
          <TableRow>
            <TableHead>#</TableHead>
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
          {users.map((row, i) => (
            <TableRow key={row._id}>
              <CustomTableCell
                className="text-muted-foreground"
                value={`${i + 1}`}
              ></CustomTableCell>
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
                value={row.isActive ? "Active" : "Inactive"}
                type="badge"
                badgeVariant={row.isActive ? "success" : "destructive"}
              />
              {/* <ActionCell
                onDelete={() => deleteMutation.mutateAsync(row._id)}
                isDeletePending={deleteMutation.isPending}
                editDialog={
                  <EditUserDialog
                    user={row}
                    trigger={
                      <Button variant="warning" size="icon-sm">
                        <PenBoxIcon />
                      </Button>
                    }
                  />
                }
              /> */}
              <CustomTableCell
                type="custom"
                className="flex items-center gap-1.5"
              >
                <Button variant="warning" size="icon-sm">
                  <PenBoxIcon />
                </Button>
                <TableDeleteAction
                  onDelete={() => deleteMutation.mutateAsync(row._id)}
                  isDeletePending={deleteMutation.isPending}
                  canDelete={row.isActive}
                />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
