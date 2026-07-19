import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTableCell } from "@/components/shared/CustomTableCell";

import ActionCell from "@/components/shared/ActionCell";
import { Subject } from "@/types/student.types";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import EditSubjectDialog from "./EditSubjectDialog";
import { useDeleteSubject } from "../hooks/subject-hooks";

const SubjectsTable = ({ subjects }: { subjects: Subject[] }) => {
  const deleteMutation = useDeleteSubject();

  return (
    <div className={`rounded-2xl border border-border w-full`}>
      <Table className={``}>
        <TableHeader className={`bg-muted`}>
          <TableRow>
            <TableHead className={`w-8`}>#</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((row, i) => (
            <TableRow key={row._id}>
              <CustomTableCell
                className="text-muted-foreground"
                value={`${i}`}
              />
              <CustomTableCell
                className="font-medium capitalize"
                value={row.title}
              />
              <CustomTableCell value={row.teacherId.userId?.name} type="text" />
              <CustomTableCell value={row.gradeId.name} type="text" />
              <ActionCell
                onDelete={() => deleteMutation.mutateAsync(row._id)}
                isDeletePending={deleteMutation.isPending}
                editDialog={
                  <EditSubjectDialog
                    subject={row}
                    trigger={
                      <Button variant="warning" size="icon-sm">
                        <PenBoxIcon />
                      </Button>
                    }
                  />
                }
              />{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectsTable;
