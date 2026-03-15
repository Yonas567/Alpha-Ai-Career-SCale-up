"use client";

import { Briefcase, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "./nav-user";
import { ThemeToggle } from "./theme-toggle";
import { ProfileApi } from "@/app/api/profile";
import { useQuery } from "@tanstack/react-query";
import { NotificationBell } from "./notification-bell";
import { SidebarTrigger } from "./ui/sidebar";
import { Role } from "@/app/types";
import { useRouter } from "next/navigation";
import { roleMap } from "@/app/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import AppHeaderSkeleton from "./app-header-skeleton";

export function AppHeader() {
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileApi.getProfile,
  });
  const isMobile = useIsMobile();
  if (!profile) return <AppHeaderSkeleton />;
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-white dark:bg-black border-b-0">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-4 lg:px-6">
        <div className="flex items-center w-1/2">
          <Separator orientation="vertical" className="h-6 bg-primary/20" />
          <div className="flex items-center gap-2 w-full ">
            <div className="flex items-center justify-between">
              {isMobile && (
                <>
                  <SidebarTrigger />
                  <span className="text-lg text-blue-600 font-bold leading-none">
                    CareerScaleUp
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <NotificationBell />

          {!isMobile && (
            <Button
              variant="ghost"
              onClick={() => router.push(`${roleMap[profile.role]}/messages`)}
            >
              <MessageSquareIcon size={22} />
              {!isMobile && <span>Messages</span>}
            </Button>
          )}

          <Separator
            orientation="vertical"
            className="h-6 bg-[hsl(var(--header-border))] hidden sm:block"
          />

          {!isMobile && <ThemeToggle />}

          <Separator
            orientation="vertical"
            className="h-6 bg-[hsl(var(--header-border))] hidden sm:block"
          />

          <NavUser user={profile} position="app-header" />
        </div>
      </div>
    </header>
  );
}
