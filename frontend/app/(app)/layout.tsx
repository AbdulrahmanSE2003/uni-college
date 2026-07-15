import AppHeader from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`flex flex-col w-full min-h-screen`}>
        <AppHeader />
        <section className={`h-full p-4`}>{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default layout;
