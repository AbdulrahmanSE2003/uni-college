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
import { useDeleteUser } from "../hooks/use-delete-user";
import TableDeleteAction from "@/components/shared/TableDeleteAction";
import TableEditDialog from "@/components/shared/TableEditDialog";
import DynamicForm from "@/components/shared/DynamicForm";
import { UpdateUserPayload } from "../types/users.types";
import { genderOptions, roleOptions, statusOptions } from "@/lib/constants";
import { updateUserSchema } from "../schemas/updateUser.schema";
import { useUpdateUser } from "../hooks/use-update-user";

const UsersTable = ({ users }: { users: User[] }) => {
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

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
              <CustomTableCell
                type="custom"
                className="flex items-center gap-1.5"
              >
                <TableEditDialog title="Edit User">
                  {({ close }) => (
                    <DynamicForm<UpdateUserPayload>
                      fields={[
                        { name: "name", label: "Name", type: "text" },
                        { name: "email", label: "Email", type: "text" },
                        { name: "phone", label: "Phone", type: "text" },
                        {
                          name: "gender",
                          label: "Gender",
                          type: "select",
                          options: genderOptions,
                        },
                        {
                          name: "role",
                          label: "Role",
                          type: "select",
                          options: roleOptions,
                        },
                        {
                          name: "isActive",
                          label: "IsActive",
                          type: "switch",
                          options: statusOptions,
                        },
                      ]}
                      schema={updateUserSchema}
                      defaultValues={{
                        name: row.name,
                        email: row.email,
                        phone: row.phone,
                        gender: row.gender,
                        role: row.role,
                        isActive: row.isActive,
                      }}
                      isPending={updateMutation.isPending}
                      onSubmit={(data) =>
                        updateMutation.mutateAsync({ id: row._id, data })
                      }
                      close={close}
                    />
                  )}
                </TableEditDialog>
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
