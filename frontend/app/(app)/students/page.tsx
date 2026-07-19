import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const StudentsSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-36" />
      <div className="flex gap-3 flex-1 justify-end">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Students"
        description="Manage student enrollments, profiles, and academic records."
      />
      <StudentsSkeleton />
    </div>
  );
};

export default page;
