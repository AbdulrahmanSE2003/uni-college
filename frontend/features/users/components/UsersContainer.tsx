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
import AddUserModal from "./AddUserModal";
import UsersSkeleton from "./UsersSkeleton";

const UsersContainer = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const [role, setRole] = useState(roleOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);

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

  return (
    <div className={`flex flex-col gap-y-6`}>
      {/* 2. Statistical Metrics Cards */}
      <UsersStats stats={data.stats} total={data.total} />
      <div className={`flex flex-col gap-y-4 items-end`}>
        <div className={`flex items-center justify-between w-full`}>
          <AddUserModal />
          {/* 3. Utilities */}
          <TableActions
            search={search}
            setSearch={setSearch}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
          />
        </div>
        <UsersTable users={users} />
      </div>

      <PaginationComp page={page} setPage={setPage} totalPages={data.pages} />
    </div>
  );
};

export default UsersContainer;
