import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const AssignmentsSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-9 w-32" />
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Assignments"
        description="Create and manage course assignments, deadlines, and submissions."
      />
      <AssignmentsSkeleton />
    </div>
  );
};

export default page;
