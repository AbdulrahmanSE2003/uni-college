"use client";

import { useGetMe } from "../hooks/use-GetMe";
import NotFound from "@/app/not-found";
import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";
import AccountDetails from "./AccountDetails";
import ProfileSkeleton from "./ProfileSkeleton";
// import { Badge } from "@/components/ui/badge";

const ProfileContainer = () => {
  const { data, isPending, error } = useGetMe();

  if (isPending) return <ProfileSkeleton />;

  if (!data) return <NotFound />;
  console.log(data);

  const userData = data.user;

  if (error) {
    return (
      <div className="w-full text-center py-10 border border-destructive/20 rounded-2xl bg-destructive/5 text-destructive text-sm font-medium">
        Failed to load profile data. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Personal Details */}
      <PersonalDetails user={userData} />

      {/* Educational Details */}
      {userData.role !== "admin" && <EducationalDetails user={userData} />}

      {/* Account Details */}
      <AccountDetails user={userData} />
    </div>
  );
};

export default ProfileContainer;
