"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NAV_LINKS } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  const links = NAV_LINKS.filter(
    (link) => link.owner === "all" || link.owner === role,
  );

  return (
    <SidebarMenu className={`gap-y-1`}>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <SidebarMenuItem
            key={link.href}
            className={`text-foreground/75 hover:text-foreground text-sm`}
          >
            <Link
              href={link.href}
              className={cn(
                `flex items-center gap-3 cursor-pointer rounded-xl group hover:bg-primary/10 p-1.5 transition-colors duration-300`,
                isActive ? "bg-primary/15 text-primary" : "",
              )}
            >
              <link.icon className="size-4 group-hover:stroke-primary transition-colors duration-300" />
              <span className="capitalize">{link.label.replace("-", " ")}</span>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default NavLinks;
