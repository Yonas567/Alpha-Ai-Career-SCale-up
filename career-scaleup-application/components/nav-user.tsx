"use client";

import {
  IconDotsVertical,
  IconLogout,
  IconMessage,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/app/types";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
export function NavUser({
  user,
  position,
}: {
  user: User | undefined;
  position: "app-header" | "app-sidebar";
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/auth";
  };

  const handleProfileClick = () => {
    router.push(`/dashboard/${user?.role.toLocaleLowerCase()}/profile`);
  };

  const handleGotoMessage = () => {
    router.push(`/dashboard/${user?.role.toLocaleLowerCase()}/messages`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-white/20! data-[active=true]:bg-white/20! data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg bg-blue-600">
                <AvatarImage
                  className="bg-blue-600"
                  src={user?.profilePicture || user?.logoUrl || ""}
                  alt={user?.fullName || user?.companyName || ""}
                />
                <AvatarFallback className="rounded-lg bg-blue-600 transition-colors">
                  {user?.fullName?.[0] || user?.companyName?.[0]}
                </AvatarFallback>
              </Avatar>
              {!(isMobile && position === "app-header") && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.fullName || user?.companyName || ""}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email || ""}
                    </span>
                  </div>
                  <IconDotsVertical className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profilePicture || user?.logoUrl || ""}
                    alt={user?.fullName || user?.companyName || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.fullName?.[0] || user?.companyName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.fullName || user?.companyName || ""}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email || ""}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleProfileClick}>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {isMobile && (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleGotoMessage}>
                  <IconMessage />
                  Messages
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            {isMobile && (
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ThemeToggle />
                  Change Theme
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
