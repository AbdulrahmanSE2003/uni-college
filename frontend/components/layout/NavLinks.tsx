"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/authStore";
import { LinkCategory, NAV_LINKS } from "@/lib/constants";

export default function NavLinks() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const userRole = user?.role || "student";

  const allowedLinks = NAV_LINKS.filter(
    (link) => link.owner === "all" || link.owner === userRole,
  );

  const renderGroup = (category: LinkCategory, label: string) => {
    const groupLinks = allowedLinks.filter(
      (link) => link.category === category,
    );
    if (groupLinks.length === 0) return null;

    return (
      <Collapsible defaultOpen className="group/collapsible w-full">
        <SidebarGroup className="py-1">
          <CollapsibleTrigger>
            <SidebarGroupLabel className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider px-2 py-1.5 hover:bg-accent/50 hover:text-accent-foreground rounded-md cursor-pointer transition-colors group">
              <span>{label}</span>
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupContent className="mt-1">
              <SidebarMenu>
                {groupLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={link.label}
                        className={`capitalize transition-all duration-200 ${
                          isActive
                            ? "bg-accent/30 text-primary font-medium hover:bg-primary/15"
                            : "hover:bg-accent/60"
                        }`}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 w-full"
                        >
                          <link.icon
                            className={`h-4 w-4 transition-transform group-hover:scale-105 ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span>{link.label.replace("-", " ")}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  };

  return (
    <div className="flex flex-col gap-y-1">
      {renderGroup("general", "General")}
      {renderGroup("academic", "Academic")}
      {renderGroup("management", "Management")}
      {renderGroup("system", "System")}
    </div>
  );
}
