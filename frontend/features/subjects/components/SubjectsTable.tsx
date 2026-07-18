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

const SubjectsTable = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className={`rounded-2xl border border-border w-full`}>
      <Table className={``}>
        <TableHeader className={`bg-muted`}>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((row) => (
            <TableRow key={row._id}>
              <CustomTableCell
                className="font-medium capitalize"
                value={row.title}
              ></CustomTableCell>
              <CustomTableCell value={row.teacherId.userId?.name} type="text" />
              <CustomTableCell value={row.gradeId.name} type="text" />
              <ActionCell row={row} user={row} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectsTable;
