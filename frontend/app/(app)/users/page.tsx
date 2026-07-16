import { Skeleton } from "@/components/ui/skeleton";
import UsersContainer from "@/features/users/components/UsersContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      }
    >
      <UsersContainer />
    </Suspense>
  );
};

export default page;
