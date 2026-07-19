import PageSkeleton from "@/components/shared/PageSkeleton";
import SubjectContainer from "@/features/subjects/components/SubjectContainer";
import { Suspense } from "react";
const page = () => {
  return (
    <section className={`flex flex-col gap-y-4`}>
      <Suspense fallback={<PageSkeleton />}>
        <SubjectContainer />
      </Suspense>
    </section>
  );
};

export default page;
