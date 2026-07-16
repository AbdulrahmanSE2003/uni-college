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
import PaginationComp from "@/components/shared/PaginationComp";
import TableActions from "./TableActions";
import { roleOptions, statusOptions } from "@/lib/constants";

const UsersContainer = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [role, setRole] = useState(roleOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, error, isPending } = useUsers({
    search: debouncedSearch,
    page,
    role,
    status,

    limit: 20,
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
      <UsersStats stats={data.stats} total={data.total} />
      <div className={`flex flex-col gap-y-3 items-end`}>
        {/* 3. Utilities */}
        <TableActions
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
        />
        <UsersTable users={users} />
      </div>

      <PaginationComp page={page} setPage={setPage} totalPages={data.pages} />
    </div>
  );
};

export default UsersContainer;
