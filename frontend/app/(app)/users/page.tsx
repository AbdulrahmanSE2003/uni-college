import PageHeader from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import UsersContainer from "@/features/users/components/UsersContainer";
import UsersSkeleton from "@/features/users/components/UsersSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <div className={`flex flex-col gap-y-4`}>
      {/* 1. Header Section */}
      <PageHeader
        heading="Users Directory"
        description="Manage system accounts, monitor administrative roles, and inspect active
              users."
      />
      <Suspense fallback={<UsersSkeleton />}>
        <UsersContainer />
      </Suspense>
    </div>
  );
};

export default page;
