"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import NavLinks from "./NavLinks";
import SidebarFooterActions from "./SidebarFooterActions";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 justify-center px-4 border-b">
        <span className="text-xl font-bold">
          <span className="text-primary">Uni</span>-College
        </span>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <NavLinks />
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarFooterActions />
      </SidebarFooter>
    </Sidebar>
  );
}
