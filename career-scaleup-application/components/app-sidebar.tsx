"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menu } from "@/app/constants";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/app/context/DashboardContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ProfileApi } from "@/app/api/profile";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { role } = useDashboardContext();
  const { open } = useSidebar();
  const isCollapsed = !open;

  const isMobile = useIsMobile();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileApi.getProfile,
  });

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="shadow-xl bg-linear-to-r from-indigo-700 via-indigo-700 to-indigo-800 dark dark border-r-0! pt-4"
    >
      <SidebarHeader className="bg-linear-to-r from-indigo-700 via-indigo-700 to-indigo-800 dark px-0! dark">
        <SidebarGroup className="py-0!">
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                {!isMobile ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="px-0! group-data-[collapsible=icon]:p-0!"
                      >
                        {isCollapsed ? (
                          <div className="flex items-center justify-center px-0!">
                            <SidebarTrigger />
                          </div>
                        ) : (
                          <div className="flex items-center px-0! gap-2 cursor-pointer">
                            <SidebarTrigger />
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-foreground leading-none">
                                CareerScaleUp
                              </span>
                            </div>
                          </div>
                        )}
                      </TooltipTrigger>

                      {isCollapsed && (
                        <TooltipContent side="right" className="py-1 text-sm">
                          CareerScaleUp
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div>
                    <SidebarTrigger className="p-0!" />
                    <span className="font-bold">CareerScaleUp</span>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="bg-linear-to-r from-indigo-700 via-indigo-700 to-indigo-800 dark dark">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="gap-4">
              {menu[role]?.map((item) => {
                if (!item.href || item.href === "#" || item.href === "") {
                  return null;
                }

                const Button = (
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === pathname}
                    className={`py-2 font-bold hover:bg-white/20! data-[active=true]:bg-white/20! ${
                      !isCollapsed || isMobile
                        ? ""
                        : "flex items-center justify-center"
                    }`}
                  >
                    <Link href={item.href}>
                      {item.icon && (
                        <div className="">
                          <item.icon />
                        </div>
                      )}
                      {(!isCollapsed || isMobile) && (
                        <span className="">{item.name.toUpperCase()}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                );

                return (
                  <SidebarMenuItem key={item.href}>
                    {!isMobile ? (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>{Button}</TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent
                              side="right"
                              className="px-2 py-1 text-sm"
                            >
                              {item.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      Button
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-linear-to-r from-indigo-700 via-indigo-700 to-indigo-800">
        <NavUser user={profile} position="app-sidebar" />
      </SidebarFooter>
    </Sidebar>
  );
}
