import ProfileContainer from "@/features/profile/components/ProfileContainer";
import ProfileSkeleton from "@/features/profile/components/ProfileSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <section>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContainer />
      </Suspense>
    </section>
  );
};

export default page;
