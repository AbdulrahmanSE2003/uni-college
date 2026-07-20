"use client";

import PageHeader from "@/components/shared/PageHeader";
import { useGetAllTeachers } from "../hooks/use-get-teachers";
import PageSkeleton from "@/components/shared/PageSkeleton";
import NotFound from "@/app/not-found";
import Error from "@/app/error";
import TeachersTable from "./TeachersTable";
import PaginationComp from "@/components/shared/PaginationComp";
import { useState } from "react";
import StatsCard from "@/components/shared/StatCard";
import { GraduationCap, NotebookIcon, Scroll, UserCheck } from "lucide-react";

const TeachersContainer = () => {
  const { data, error, isPending } = useGetAllTeachers();
  const [page, setPage] = useState(1);

  if (isPending) return <PageSkeleton />;

  if (!data) return <NotFound />;

  if (error) return <Error />;
  const teachers = data.teachers.teachers;
  const stats = data.teachers.stats;
  return (
    <div className={`flex flex-col gap-y-6`}>
      <PageHeader
        heading="Teachers"
        description="Manage teacher profiles, assignments, and department allocations."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <StatsCard
          value={stats.totalTeachers}
          title="Total Teachers"
          Icon={UserCheck}
          iconClass="stroke-indigo-500"
        />
        <StatsCard
          value={stats.totalGrades}
          title="Total Grades"
          Icon={GraduationCap}
          iconClass="stroke-teal-500"
        />
        <StatsCard
          value={stats.totalQualifications}
          title="Total Grades"
          Icon={Scroll}
          iconClass="stroke-red-500"
        />
        <StatsCard
          value={stats.totalSubjects}
          title="Total Subjects"
          Icon={NotebookIcon}
        />
      </div>
      <TeachersTable teachers={teachers} />
      <PaginationComp page={page} setPage={setPage} totalPages={1} />
    </div>
  );
};

export default TeachersContainer;
