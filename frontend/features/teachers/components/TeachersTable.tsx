"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTableCell } from "@/components/shared/CustomTableCell";
import { TeacherUser } from "@/types/user.types";
import TableEditDialog from "@/components/shared/TableEditDialog";
import DynamicForm from "@/components/shared/DynamicForm";
import { TeacherProfile } from "@/types/teacher.types";

const TeachersTable = ({ teachers }: { teachers: TeacherProfile[] }) => {
  return (
    <div
      className={`rounded-2xl ${teachers.length ? " border border-border" : ""} w-full`}
    >
      <Table className={``}>
        <TableHeader className={`bg-muted`}>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grades</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Joining Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((row, i) => (
            <TableRow key={row._id}>
              <CustomTableCell
                className="text-muted-foreground"
                value={`${i + 1}`}
              />
              <CustomTableCell
                className="font-medium capitalize"
                value={row.userId.name}
              />
              {/*<CustomTableCell
                type="custom"
                className="flex items-center gap-1.5"
              >
                <TableEditDialog title="Edit User">
                  {({ close }) => (
                    <DynamicForm<UpdateUserPayload>
                      fields={userFields}
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
              </CustomTableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeachersTable;
