"use client";

import NotFound from "@/app/not-found";
import { useGetSubjects } from "../hooks/use-subjects";
import SubjectCard from "./SubjectCard";
import Error from "@/app/error";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import SubjectsTable from "./SubjectsTable";

const SubjectContainer = () => {
  const { user } = useAuthStore();
  const { data, error, isPending } = useGetSubjects(user?.role);
  if (isPending)
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className={`h-32 rounded-2xl`} />
        ))}
      </div>
    );
  if (!data) return <NotFound />;

  if (error) return <Error />;
  return (
    <>
      {user?.role !== "admin" ? (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5`}>
          {data.subjects.map((subject) => (
            <SubjectCard subject={subject} key={subject.title} />
          ))}
        </div>
      ) : (
        <SubjectsTable subjects={data.subjects} />
      )}
    </>
  );
};

export default SubjectContainer;
