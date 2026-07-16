"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, GraduationCap, UserSquare } from "lucide-react";
import StatCard from "./StatCard";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  role?: "admin" | "teacher" | "student" | string;
}

interface UsersStatsProps {
  users: User[];
}

export const UsersStats = ({ users }: UsersStatsProps) => {
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      teachers: users.filter((u) => u.role === "teacher").length,
      students: users.filter(
        (u) =>
          u.role === "student" ||
          (!u.role && u.role !== "admin" && u.role !== "teacher"),
      ).length,
    };
  }, [users]);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        Icon={Users}
        iconClass="text-blue-500"
        title="Total Accounts"
        value={stats.total}
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
