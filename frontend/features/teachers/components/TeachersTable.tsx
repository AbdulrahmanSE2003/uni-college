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
import TableDeleteAction from "@/components/shared/TableDeleteAction";

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
            <TableHead>Subjects</TableHead>
            <TableHead>Grades</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Joining Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((row, i) => {
            const names = row.subjectIds.map((s) => s.name);
            return (
              <TableRow key={row._id} className="text-muted-foreground">
                <CustomTableCell value={`${i + 1}`} />
                <CustomTableCell
                  className="font-medium capitalize text-foreground"
                  value={row.userId.name}
                />
                <CustomTableCell
                  value={
                    names.length <= 2
                      ? names.join(", ")
                      : `${names.slice(0, 2).join(", ")} +${names.length - 2}`
                  }
                />

                <CustomTableCell
                  value={row.grades.map((g) => g.name).join(", ")}
                />
                <CustomTableCell value={row.qualification || "N/A"} />

                <CustomTableCell
                  value={new Date(row.joiningDate).toLocaleDateString()}
                />

                {/* <CustomTableCell type="custom">
                  <TableDeleteAction onDelete={()=>{}}/>
                  <TableEditDialog/>
                </CustomTableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeachersTable;
