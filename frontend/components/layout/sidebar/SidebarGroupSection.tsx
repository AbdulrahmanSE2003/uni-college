"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { LinkCategory, SidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarGroupSectionProps {
  label: string;
  category: LinkCategory;
  links: SidebarLinks[];
}

const SidebarGroupSection = ({
  label,
  category,
  links,
}: SidebarGroupSectionProps) => {
  const pathname = usePathname();

  const groupLinks = links.filter((link) => link.category === category);

  if (!groupLinks.length) return null;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="py-1">
        <CollapsibleTrigger>
          <SidebarGroupLabel className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <>
              <span>{label}</span>

              <ChevronDown className="size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </>
          </SidebarGroupLabel>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {groupLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <SidebarMenuItem key={link.href}>
                    <Link href={link.href} className="block">
                      <SidebarMenuButton
                        isActive={isActive}
                        className={cn(
                          "relative h-10 w-full rounded-lg transition-all cursor-pointer",
                          isActive
                            ? "bg-primary/10 text-primary font-medium before:absolute before:left-0 before:top-1.5 before:h-7 before:w-1 before:rounded-full before:bg-primary"
                            : "hover:bg-accent",
                        )}
                      >
                        <link.icon
                          className={cn(
                            "size-4",
                            isActive ? "text-primary" : "text-muted-foreground",
                          )}
                        />

                        <span className="capitalize">
                          {link.label.replace("-", " ")}
                        </span>
                      </SidebarMenuButton>
                    </Link>
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

export default SidebarGroupSection;
