import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const ExamsSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-36" />
      <Skeleton className="h-9 w-48" />
    </div>
    <Skeleton className="h-80 w-full" />
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Exams"
        description="Schedule, manage, and review examinations."
      />
      <ExamsSkeleton />
    </div>
  );
};

export default page;
