import PageHeader from "@/components/shared/PageHeader";
import SubjectContainer from "@/features/subjects/components/SubjectContainer";
import { Loader } from "lucide-react";
import { Suspense } from "react";
const page = () => {
  return (
    <section className={`flex flex-col gap-y-4`}>
      <PageHeader
        heading="Subjects Directory"
        description="Manage subjects, monitor each grade, and Learning cycle."
      />
      <Suspense fallback={<Loader />}>
        <SubjectContainer />
      </Suspense>
    </section>
  );
};

export default page;
