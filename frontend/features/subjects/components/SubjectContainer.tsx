"use client";

import NotFound from "@/app/not-found";
import SubjectCard from "./SubjectCard";
import Error from "@/app/error";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import SubjectsTable from "./SubjectsTable";
import TableFilters from "@/components/shared/TableFilters";
import { useState } from "react";
import AddModal from "@/components/shared/AddModal";
import DynamicForm from "@/components/shared/DynamicForm";
import { useGetAllGrades } from "@/features/grades/hooks/use-get-all-grades";
import { SubjectPayload } from "../types/subject.types";
import { useGetSubjects } from "../hooks/use-subjects";
import { useCreateSubject } from "../hooks/use-create-subjects";
import { subjectFields } from "../config/subject-fields";
import { createSubjectSchema } from "../schemas/subjects.schema";
import { BookOpenTextIcon, GraduationCap, Notebook, User } from "lucide-react";
import StatsCard from "@/components/shared/StatCard";
import { FieldConfig } from "@/types/field-config.types";
import { useGetAllTeachers } from "@/features/teachers/hooks/use-get-teachers";
import SearchBar from "@/components/shared/SearchBar";
import { useDebounce } from "use-debounce";

const SubjectContainer = () => {
  const [gradeId, setGradeId] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);
  const { user } = useAuthStore();
  const createMutation = useCreateSubject();

  const { data, error, isPending } = useGetSubjects(user?.role, {
    search: debouncedSearch,
    page,
    gradeId,
    limit: 10,
  });

  const {
    data: grades,
    error: gradeError,
    isPending: gradeIsPending,
  } = useGetAllGrades();

  const {
    data: teachers,
    error: teachersError,
    isPending: teachersPending,
  } = useGetAllTeachers();

  if (isPending || gradeIsPending || teachersPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    );

  if (error || gradeError || teachersError) return <Error />;
  if (!data || !grades || !teachers) return <NotFound />;

  const subjects = data.subjects.subjects;
  const stats = data.subjects.stats;
  const gradeOptions = grades.grades.map((g) => ({
    label: g.name,
    value: g._id,
  }));
  const teacherOptions = teachers.users.map((t) => ({
    label: t.name,
    value: t.name,
  }));

  const subjectFieldsWithOptions: FieldConfig[] = [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "gradeId", label: "Grade", type: "select", options: gradeOptions },
    {
      name: "teacherId",
      label: "Teacher",
      type: "select",
      options: teacherOptions,
    },
  ];

  const handleCreate = async (payload: SubjectPayload) => {
    try {
      await createMutation.mutateAsync(payload);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      {user?.role === "admin" ? (
        <div className="flex flex-col gap-y-6 items-end">
          {/* Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard
              Icon={BookOpenTextIcon}
              title="Total Subjects"
              value={stats.totalSubjects}
              iconClass="stroke-primary"
            />
            <StatsCard
              Icon={Notebook}
              title="Total Materials"
              value={stats.totalMaterials}
              iconClass="stroke-amber-500"
            />
            <StatsCard
              Icon={GraduationCap}
              title="Total Grades"
              value={stats.totalGrades}
            />
            <StatsCard
              Icon={User}
              title="Total Teachers"
              value={stats.totalTeachers}
              iconClass="stroke-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <AddModal title="Add Subject">
              {({ close }) => (
                <DynamicForm<SubjectPayload>
                  fields={subjectFieldsWithOptions}
                  schema={createSubjectSchema}
                  defaultValues={{ name: "", teacherId: "", gradeId: "" }}
                  isPending={createMutation.isPending}
                  onSubmit={handleCreate}
                  close={close}
                />
              )}
            </AddModal>

            <div className={`flex gap-3 items-center`}>
              <SearchBar search={search} setSearch={setSearch} />
              <TableFilters
                value={gradeId}
                onValueChange={setGradeId}
                placeholder="Grade"
                options={gradeOptions}
              />
            </div>
          </div>

          <SubjectsTable subjects={subjects} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjects.map((subject) => (
            <SubjectCard subject={subject} key={subject._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default SubjectContainer;
