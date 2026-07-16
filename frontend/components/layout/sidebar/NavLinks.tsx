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

const NavLinks = () => {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  const links = NAV_LINKS.filter(
    (link) => link.owner === "all" || link.owner === role,
  );

  return (
    <SidebarMenu className={`gap-y-2`}>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              className={`cursor-pointer hover:bg-primary/10 ${isActive ? "bg-primary/15" : ""}`}
              isActive={isActive}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-3 cursor-pointer `}
              >
                <link.icon className="size-4" />
                <span className="capitalize">
                  {link.label.replace("-", " ")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default NavLinks;
