import { Role } from "@/types/common.types";
import {
  Calendar1Icon,
  File,
  GraduationCap,
  IdCard,
  LayoutDashboard,
  Logs,
  LucideIcon,
  Notebook,
  NotepadText,
  PaperclipIcon,
  ScrollText,
  Settings2,
  User2,
  UserCheck,
  Users,
} from "lucide-react";

export type LinkCategory = "general" | "academic" | "management" | "system";

export interface SidebarLinks {
  label: string;
  icon: LucideIcon;
  href: string;
  owner: Role | "all";
  category: LinkCategory;
}

export const SIDEBAR_GROUPS = [
  {
    key: "general",
    label: "General",
  },
  {
    key: "academic",
    label: "Academic",
  },
  {
    key: "management",
    label: "Management",
  },
  {
    key: "system",
    label: "System",
  },
] as const;

export const NAV_LINKS: SidebarLinks[] = [
  // General
  {
    label: "dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    owner: "all",
    category: "general",
  },
  {
    label: "timetable",
    icon: Calendar1Icon,
    href: "/timetable",
    owner: "all",
    category: "general",
  },

  // Academic
  {
    label: "subjects",
    icon: Notebook,
    href: "/subjects",
    owner: "all",
    category: "academic",
  },
  {
    label: "assignments",
    icon: PaperclipIcon,
    href: "/assignments",
    owner: "all",
    category: "academic",
  },
  {
    label: "exams",
    icon: File,
    href: "/exams",
    owner: "all",
    category: "academic",
  },
  {
    label: "submissions",
    icon: NotepadText,
    href: "/submissions",
    owner: "admin",
    category: "academic",
  },
  {
    label: "scores",
    icon: ScrollText,
    href: "/scores",
    owner: "all",
    category: "academic",
  },
  {
    label: "results",
    icon: GraduationCap,
    href: "/results",
    owner: "all",
    category: "academic",
  },
  {
    label: "report-card",
    icon: IdCard,
    href: "/report-card",
    owner: "student",
    category: "academic",
  },

  // Management
  {
    label: "students",
    icon: User2,
    href: "/students",
    owner: "admin",
    category: "management",
  },
  {
    label: "teachers",
    icon: UserCheck,
    href: "/teachers",
    owner: "admin",
    category: "management",
  },
  {
    label: "users",
    icon: Users,
    href: "/users",
    owner: "admin",
    category: "management",
  },
  {
    label: "grades",
    icon: Settings2,
    href: "/grades",
    owner: "admin",
    category: "management",
  },

  // System
  {
    label: "Logs",
    icon: Logs,
    href: "/audit-logs",
    owner: "admin",
    category: "system",
  },
];

export const roleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Teacher", value: "teacher" },
  { label: "Student", value: "student" },
];
export const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inActive" },
];

export const genderOptions = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "N/A",
    value: "N/A",
  },
];
