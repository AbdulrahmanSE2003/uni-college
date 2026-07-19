import PageSkeleton from "@/components/shared/PageSkeleton";
import TeachersContainer from "@/features/teachers/components/TeachersContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Suspense fallback={<PageSkeleton />}>
        <TeachersContainer />
      </Suspense>
    </div>
  );
};

export default page;
