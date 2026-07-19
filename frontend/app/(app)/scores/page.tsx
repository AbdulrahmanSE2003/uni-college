import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const ScoresSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-9 w-32" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
    <Skeleton className="h-72 w-full" />
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Scores"
        description="Track student scores across quizzes, assignments, and exams."
      />
      <ScoresSkeleton />
    </div>
  );
};

export default page;
