import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const AuditLogsSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-9 w-32" />
    </div>
    <Skeleton className="h-96 w-full" />
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
        heading="Audit Logs"
        description="Track all administrative actions and system changes."
      />
      <AuditLogsSkeleton />
    </div>
  );
};

export default page;
