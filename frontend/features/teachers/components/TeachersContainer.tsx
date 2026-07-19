"use client";

import PageHeader from "@/components/shared/PageHeader";
import { useGetAllTeachers } from "../hooks/use-get-teachers";
import PageSkeleton from "@/components/shared/PageSkeleton";
import NotFound from "@/app/not-found";
import Error from "@/app/error";
import TeachersTable from "./TeachersTable";
import PaginationComp from "@/components/shared/PaginationComp";
import { useState } from "react";

const TeachersContainer = () => {
  const { data, error, isPending } = useGetAllTeachers();
  const [page, setPage] = useState(1);

  if (isPending) return <PageSkeleton />;

  if (!data) return <NotFound />;

  if (error) return <Error />;
  const teachers = data.teachers;
  return (
    <div className={`flex flex-col gap-y-6`}>
      <PageHeader
        heading="Teachers"
        description="Manage teacher profiles, assignments, and department allocations."
      />
      <TeachersTable teachers={teachers} />
      <PaginationComp page={page} setPage={setPage} totalPages={1} />
    </div>
  );
};

export default TeachersContainer;
