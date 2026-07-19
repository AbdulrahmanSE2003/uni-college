// features/subjects/components/EditSubjectModal.tsx
"use client";

import { ReactElement } from "react";
import FormDialog from "@/components/shared/FormDialog";
import DynamicForm from "@/components/shared/DynamicForm";
import { createSubjectSchema } from "../schemas/subjects.schema";
import { useUpdateSubject } from "../hooks/subject-hooks";
import { SubjectPayload } from "../types/subject.types";
import { Subject } from "@/types/student.types";

interface Props {
  subject: Subject;
  trigger: ReactElement;
  gradeOptions: { label: string; value: string }[];
  teacherOptions: { label: string; value: string }[];
}

const EditSubjectDialog = ({
  subject,
  trigger,
  gradeOptions,
  teacherOptions,
}: Props) => {
  const updateMutation = useUpdateSubject();

  return (
    <FormDialog title="Edit Subject" trigger={trigger}>
      {({ close }) => (
        <DynamicForm<SubjectPayload>
          fields={[
            { name: "name", label: "Subject Name", type: "text" },
            {
              name: "gradeId",
              label: "Grade",
              type: "select",
              options: gradeOptions,
            },
            {
              name: "teacherId",
              label: "Teacher",
              type: "select",
              options: teacherOptions,
            },
          ]}
          schema={createSubjectSchema}
          defaultValues={{
            name: subject.name,
            gradeId: subject.gradeId._id,
            teacherId: subject.teacherId._id,
          }}
          isPending={updateMutation.isPending}
          onSubmit={(data) =>
            updateMutation.mutateAsync({ id: subject._id, data })
          }
          close={close}
        />
      )}
    </FormDialog>
  );
};

export default EditSubjectDialog;
