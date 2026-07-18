import { Skeleton } from "@/components/ui/skeleton";
import UsersContainer from "@/features/users/components/UsersContainer";
import UsersSkeleton from "@/features/users/components/UsersSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <UsersContainer />
    </Suspense>
  );
};

export default page;
