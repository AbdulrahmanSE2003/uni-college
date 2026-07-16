"use client";

import Link from "next/link";
import { LogOut, UserCircle2 } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useLogout } from "@/features/auth/hooks/use-logout";

const SidebarFooterActions = () => {
  const logoutMutation = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Link href="/profile" className={`flex items-center gap-2`}>
            <UserCircle2 className="size-4" />
            <span>Profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => logoutMutation.mutate()}
          className="text-destructive hover:text-destructive"
        >
          <LogOut className="size-4" />
          <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterActions;
