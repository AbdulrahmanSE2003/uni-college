"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import NavLinks from "./NavLinks";
import SidebarFooterActions from "./SidebarFooterActions";
import { GraduationCap } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className={` border-r`}>
      <SidebarHeader className="h-12 justify-center px-4 border-b">
        <div className="text-xl font-bold flex items-center gap-1.5">
          <div className={`bg-primary rounded-xl p-1`}>
            <GraduationCap className={`stroke-white `} />
          </div>
          <span className="text-primary">
            Uni<span className={`text-foreground`}>-College</span>
          </span>
        </div>
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
