"use client";
import { Users, Shield, GraduationCap, UserSquare } from "lucide-react";
import { Stats } from "../types/users.types";
import StatCard from "@/components/shared/StatCard";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  role?: "admin" | "teacher" | "student" | string;
}

interface UsersStatsProps {
  stats: Stats;
  total: number;
}

export const UsersStats = ({ stats, total }: UsersStatsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        Icon={Users}
        iconClass="text-blue-500"
        title="Total Accounts"
        value={total}
        note=""
      />
      <StatCard
        Icon={Shield}
        iconClass="text-destructive"
        title="Administrators"
        value={stats.admins}
        note="Full control access"
      />
      <StatCard
        Icon={GraduationCap}
        iconClass="text-primary"
        title="Teachers"
        value={stats.teachers}
        note="Instructors and moderators"
      />
      <StatCard
        Icon={UserSquare}
        title="Students"
        value={stats.students}
        note="Active learners"
      />
    </div>
  );
};

export default UsersStats;
