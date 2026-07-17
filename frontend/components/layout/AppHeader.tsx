"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

const AppHeader = () => {
  const pathname = usePathname();
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleDateString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setFormattedTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 border-b border-border shadow-xs w-full bg-sidebar p-2 px-4 flex justify-between items-center">
      <div className={`flex items-center gap-x-3`}>
        <SidebarTrigger />
        <div className="capitalize text-primary font-semibold text-xl tracking-wide">
          {pathname.slice(1).split("/").at(0)}
        </div>
      </div>

      <div className={`flex items-center gap-3`}>
        <ThemeToggle />
        <div className="text-sm text-muted-foreground font-medium">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
