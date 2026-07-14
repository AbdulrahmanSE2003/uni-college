import { UserRole } from "@/features/auth/types/auth.types";
import {
  Calendar1Icon,
  File,
  GraduationCap,
  IdCard,
  LayoutDashboard,
  Logs,
  LucideIcon,
  Medal,
  Notebook,
  PaperclipIcon,
  ScrollText,
  Settings2,
  Users,
} from "lucide-react";

interface SidebarLinks {
  label: string;
  icon: LucideIcon;
  href: string;
  owner: UserRole | "all";
}

export const NAV_LINKS: SidebarLinks[] = [
  {
    label: "dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    owner: "all",
  },
  { label: "subjects", icon: Notebook, href: "/subjects", owner: "all" },
  {
    label: "assignments",
    icon: PaperclipIcon,
    href: "/assignments",
    owner: "all",
  },
  { label: "exams", icon: File, href: "/exams", owner: "all" },
  { label: "timetable", icon: Calendar1Icon, href: "/timetable", owner: "all" },
  { label: "scores", icon: ScrollText, href: "/scores", owner: "all" },
  { label: "results", icon: GraduationCap, href: "/results", owner: "student" },
  {
    label: "report-card",
    icon: IdCard,
    href: "/report-card",
    owner: "student",
  },
  { label: "users", icon: Users, href: "/users", owner: "admin" },
  { label: "grades", icon: Settings2, href: "/grades", owner: "admin" },
  { label: "Logs", icon: Logs, href: "/audit-logs", owner: "admin" },
];
