import { User } from "@/types/user.types";

import DataField from "./DataField";
import { Separator } from "@/components/ui/separator";
import UserAssigning from "./UserAssigning";
const EducationalDetails = ({ user }: { user: User }) => {
  return (
    <div className="border border-border shadow-xs rounded-2xl p-6 bg-card">
      <h2 className="font-semibold text-lg mb-4 text-foreground">
        Educational Details
        <Separator />
      </h2>
      {user.role === "student" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DataField label="GPA" value={user.student.gpa} />
            <DataField label="Grade" value={user.student.gradeId.name} />
            <DataField
              label="Academic Year"
              value={user.student.gradeId?.academicYear}
            />
            <DataField
              label="Academic ID"
              value={user.student.academicId}
              canCopy
            />
            <DataField
              label="Subjects"
              value={user.student.subjectIds.length}
            />
          </div>
          {user.student.subjectIds && user.student.subjectIds.length > 0 && (
            <UserAssigning assigning={user.student.subjectIds} />
          )}
        </>
      )}

      {user.role === "teacher" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DataField label="Joining Date" value={user.teacher.joiningDate} />
          </div>
          {user.teacher.subjectIds && user.teacher.subjectIds.length > 0 && (
            <>
              <UserAssigning assigning={user.teacher.subjectIds} />
              <UserAssigning assigning={user.teacher.grades} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EducationalDetails;
