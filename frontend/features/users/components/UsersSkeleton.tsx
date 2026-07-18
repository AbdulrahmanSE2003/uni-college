import { Skeleton } from "@/components/ui/skeleton";

const UsersSkeleton = () => {
  return (
    <div className={`flex flex-col gap-y-6`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>

      <div className={`flex flex-col gap-y-4 items-end`}>
        <div className={`w-1/2 ml-auto flex gap-3 items-center`}>
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-9 w-1/4" />
        </div>
        <Skeleton className="h-88 w-full" />
      </div>
    </div>
  );
};

export default UsersSkeleton;
