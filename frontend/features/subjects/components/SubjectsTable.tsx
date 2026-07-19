import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTableCell } from "@/components/shared/CustomTableCell";

import { Subject } from "@/types/student.types";
import { useDeleteSubject, useUpdateSubject } from "../hooks/subject-hooks";
import TableDeleteAction from "@/components/shared/TableDeleteAction";
import TableEditDialog from "@/components/shared/TableEditDialog";
import DynamicForm from "@/components/shared/DynamicForm";
import { createSubjectSchema } from "../schemas/subjects.schema";
import { SubjectPayload } from "../types/subject.types";
import { FieldConfig } from "@/types/field-config.types";

const SubjectsTable = ({
  subjects,
  fields,
}: {
  subjects: Subject[];
  fields: FieldConfig[];
}) => {
  const updateMutation = useUpdateSubject();
  const deleteMutation = useDeleteSubject();
  console.log(subjects[0]);

  return (
    <div
      className={`rounded-2xl w-full ${subjects.length ? "border border-border " : ""}`}
    >
      {subjects.length ? (
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
                  value={`${i + 1}`}
                />
                <CustomTableCell
                  className="font-medium capitalize"
                  value={row.name}
                />
                <CustomTableCell
                  value={row.teacherId.userId?.name}
                  type="text"
                />
                <CustomTableCell value={row.gradeId.name} type="text" />
                <CustomTableCell type="custom">
                  <TableEditDialog title="Edit Subject">
                    {({ close }) => (
                      <DynamicForm<SubjectPayload>
                        close={close}
                        fields={fields}
                        schema={createSubjectSchema}
                        defaultValues={{
                          name: row.name,
                          teacherId: row.teacherId.userId.name,
                          gradeId: row.gradeId.name,
                        }}
                        isPending={updateMutation.isPending}
                        onSubmit={(data) =>
                          updateMutation.mutateAsync({ id: row._id, data })
                        }
                      />
                    )}
                  </TableEditDialog>
                  <TableDeleteAction
                    onDelete={() => deleteMutation.mutateAsync(row._id)}
                    isDeletePending={deleteMutation.isPending}
                  />
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className={`text-sm text-center text-muted-foreground`}>
          No subjects yet.
        </div>
      )}
    </div>
  );
};

export default SubjectsTable;
