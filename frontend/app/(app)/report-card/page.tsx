import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const ReportCardSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-40 w-40 rounded-full" />
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Report Card"
        description="View your academic performance and grade summaries."
      />
      <ReportCardSkeleton />
    </div>
  );
};

export default page;
