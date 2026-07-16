import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subject } from "@/types/student.types";

const SubjectsTable = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <Table>
      <TableCaption>Total Subjects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead className="text-right">Materials</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((row) => (
          <TableRow key={row._id}>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.teacherId.userId.name}</TableCell>
            <TableCell>{row.gradeId.name}</TableCell>
            <TableCell className="text-right">{row.materials.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubjectsTable;
