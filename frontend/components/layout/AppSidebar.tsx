"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NavLinks from "./NavLinks";
import SidebarFooterActions from "./SidebarFooterActions";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader
        className={`flex flex-row justify-between items-center px-3`}
      >
        <span className={`font-semibold text-lg`}>
          <span className={`text-primary`}>Uni</span>-College 🎓
        </span>
      </SidebarHeader>
      <SidebarContent className={`px-3`}>
        <SidebarGroup />
        <NavLinks />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={`px-3`}>
        <SidebarFooterActions />
      </SidebarFooter>
    </Sidebar>
  );
}
