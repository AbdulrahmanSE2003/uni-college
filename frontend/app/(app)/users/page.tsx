import PageSkeleton from "@/components/shared/PageSkeleton";
import UsersContainer from "@/features/users/components/UsersContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <div className={`flex flex-col gap-y-4`}>
      <Suspense fallback={<PageSkeleton />}>
        <UsersContainer />
      </Suspense>
    </div>
  );
};

export default page;
