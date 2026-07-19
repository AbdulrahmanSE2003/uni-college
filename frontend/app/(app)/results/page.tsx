import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const ResultsSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-9 w-36" />
    </div>
    <Skeleton className="h-80 w-full" />
    <div className="flex justify-center gap-2">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Results"
        description="View and manage published academic results."
      />
      <ResultsSkeleton />
    </div>
  );
};

export default page;
