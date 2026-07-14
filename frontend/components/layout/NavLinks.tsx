"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const NavLinks = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const role = user?.role;
  if (!role) redirect("/login");
  return (
    <ul className={`flex flex-col gap-y-1.5`}>
      {NAV_LINKS.map((link) => {
        const canView = role === link.owner || link.owner === "all";
        return (
          canView && (
            <li
              className={cn(
                `p-2 capitalize text-foreground/85 font-medium text-sm cursor-pointer hover:text-foreground hover:bg-muted-foreground/20 transition-colors duration-300 rounded-lg`,
                pathname === link.href ? "bg-muted-foreground/20" : "",
              )}
              key={link.label}
            >
              <Link
                className={cn(
                  `flex items-center gap-3`,
                  pathname === link.href ? "text-primary font-semibold" : "",
                )}
                href={link.href}
              >
                <link.icon className={`size-4.5`} />
                {link.label}
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default NavLinks;
