"use client";

import { Room } from "@/app/api/chat";
import { Button } from "../ui/button";
import { User } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent } from "../ui/sheet";
import ProfileSection from "./profile-section";
import { useState } from "react";

export default function ChatHeader({
  room,
  profile,
  onBack,
}: {
  room: Room;
  profile: User;
  onBack?: () => void;
}) {
  const isMobile = useIsMobile();
  const [openProfile, setOpenProfile] = useState(false);

  const reciever = room.participants.find(
    (p) => p.user?.id !== profile.id
  )?.user;

  if (!reciever) return null;

  return (
    <div className="border-b rounded-t-md px-3 sm:px-4 py-3 flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        {isMobile && onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="-ml-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <Avatar className="h-9 w-9">
          <AvatarImage
            src={reciever.profilePicture || "/placeholder-avatar.png"}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback>
            {reciever.fullName?.[0] || reciever.companyName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col leading-tight">
          <p className="text-sm font-medium truncate max-w-[160px] sm:max-w-none">
            {reciever.fullName || reciever.companyName}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenProfile(true)}>
              View Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {isMobile && (
        <Sheet open={openProfile} onOpenChange={setOpenProfile}>
          <SheetContent side="bottom" className="h-[90vh] p-0">
            <ProfileSection room={room} profile={profile} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
