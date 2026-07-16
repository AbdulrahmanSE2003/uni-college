"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import NotFound from "@/app/not-found";
import { useUsers } from "../hooks/use-users";
import Error from "@/app/error";
import { Skeleton } from "@/components/ui/skeleton";
import UsersStats from "./UsersStats";
import PageHeader from "@/components/shared/PageHeader";
import UsersTable from "./UsersTable";

const UsersContainer = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, error, isPending } = useUsers({
    search: debouncedSearch,
    page: 1,
    limit: 10,
  });
  const users = useMemo(() => data?.users || [], [data]);

  if (!data) return <NotFound />;
  if (isPending) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) return <Error />;
  if (!data || !data.users) return <NotFound />;

  return (
    <div className={`flex flex-col gap-y-6`}>
      {/* 1. Header Section */}
      <PageHeader
        heading="Users Directory"
        description="Manage system accounts, monitor administrative roles, and inspect active
        users."
      />

      {/* 2. Statistical Metrics Cards */}
      <UsersStats users={users} />

      <UsersTable users={users} search={search} setSearch={setSearch} />
    </div>
  );
};

export default UsersContainer;
