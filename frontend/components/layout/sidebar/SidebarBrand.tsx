"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

const SidebarBrand = () => {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3 rounded-xl px-4 py-0 h-11.75 transition-colors hover:bg-accent"
    >
      <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <GraduationCap className="size-5" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">
          Uni<span className="text-primary">College</span>
        </span>
        <span className="text-xs text-muted-foreground">Management System</span>
      </div>
    </Link>
  );
};

export default SidebarBrand;
