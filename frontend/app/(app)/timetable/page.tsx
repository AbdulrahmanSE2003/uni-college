import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const TimetableSkeleton = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-9 w-40" />
    </div>
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 25 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  </div>
);

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <PageHeader
        heading="Timetable"
        description="View your weekly class schedule and time slots."
      />
      <TimetableSkeleton />
    </div>
  );
};

export default page;
