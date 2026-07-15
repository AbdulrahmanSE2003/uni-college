import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton className={`min-h-56 shadow-xs rounded-2xl`} />
      <Skeleton className={`min-h-56 shadow-xs rounded-2xl`} />
      <Skeleton className={`min-h-56 shadow-xs rounded-2xl`} />
    </div>
  );
};

export default ProfileSkeleton;
