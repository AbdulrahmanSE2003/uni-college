"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import NotFound from "@/app/not-found";
import { useUsers } from "../hooks/use-users";
import Error from "@/app/error";
import UsersTable from "./UsersTable";
import PaginationComp from "@/components/shared/PaginationComp";
import { roleOptions, statusOptions } from "@/lib/constants";
import UsersSkeleton from "./UsersSkeleton";
import StatsCard from "@/components/shared/StatCard";
import { GraduationCap, Shield, Users, UserSquare } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import TableFilters from "@/components/shared/TableFilters";

const UsersContainer = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const { data, error, isPending } = useUsers({
    search: debouncedSearch,
    page,
    role,
    status,

    limit: 20,
  });
  const users = useMemo(() => data?.users || [], [data]);

  if (isPending) {
    return <UsersSkeleton />;
  }

  if (error) return <Error />;
  if (!data || !data.users) return <NotFound />;

  const { stats } = data;

  return (
    <div className={`flex flex-col gap-y-6`}>
      {/* 2. Statistical Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <StatsCard
          Icon={Users}
          iconClass="stroke-blue-500"
          title="Total Accounts"
          value={data.total}
          note=""
        />
        <StatsCard
          Icon={Shield}
          iconClass="stroke-destructive"
          title="Administrators"
          value={stats.admins}
          note="Full control access"
        />
        <StatsCard
          Icon={GraduationCap}
          iconClass="stroke-primary"
          title="Teachers"
          value={stats.teachers}
          note="Instructors and moderators"
        />
        <StatsCard
          Icon={UserSquare}
          title="Students"
          value={stats.students}
          note="Active learners"
        />
      </div>
      <div className={`flex flex-col gap-y-4 items-end`}>
        <div className={`flex gap-3 items-center w-full md:w-1/2`}>
          <SearchBar search={search} setSearch={setSearch} />
          <TableFilters
            value={role}
            onValueChange={setRole}
            placeholder="Role"
            options={roleOptions}
          />
          <TableFilters
            value={status}
            onValueChange={setStatus}
            placeholder="Status"
            options={statusOptions}
          />
        </div>
        <UsersTable users={users} />
      </div>

      <PaginationComp page={page} setPage={setPage} totalPages={data.pages} />
    </div>
  );
};

export default UsersContainer;
