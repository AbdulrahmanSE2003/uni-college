"use client";

import { ReactNode, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetMe } from "@/features/profile/hooks/use-GetMe";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, isPending, error } = useGetMe();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-background">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data?.user) {
    toast.info("You need to login first.");
    redirect("/login");
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full min-h-screen">
        <AppHeader />
        <section className="h-full p-4">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
