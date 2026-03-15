"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Room } from "@/app/api/chat";
import { User } from "@/app/types";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function RoomList({
  rooms,
  profile,
  activeRoomId,
  onSelectRoom,
}: {
  rooms: Room[];
  profile: User;
  activeRoomId?: string;
  onSelectRoom: (room: Room) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((r) => {
    const other = r.participants.find((p) => p.user?.id !== profile.id)?.user;
    const roomTitle =
      other?.fullName?.toLowerCase() || other?.companyName?.toLowerCase();
    return roomTitle?.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full h-full rounded-xl bg-card flex-col flex border">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground dark:text-white">
          Messages
        </h1>
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-white/60" />{" "}
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg bg-background dark:bg-black border-border dark:border-white/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredRooms.map((room) => {
          const lastMsg = room.messages.at(-1);
          const other = room.participants.find(
            (p) => p.user?.id !== profile.id,
          )?.user;

          if (!other) return null;

          const isActive = activeRoomId === room.id;

          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className={`w-full px-4 py-3 text-left border-b border-border dark:border-white/10 transition-colors ${
                isActive
                  ? "bg-[#4d32fb]/10 dark:bg-[#4d32fb]/20 hover:bg-[#4d32fb]/15 dark:hover:bg-[#4d32fb]/25"
                  : "hover:bg-muted/50 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="relative group cursor-pointer"
                  style={{ width: 40, height: 40 }}
                >
                  <Avatar className="w-full h-full rounded-full overflow-hidden">
                    <AvatarImage
                      className="relative group cursor-pointer object-cover"
                      style={{ width: 40, height: 40 }}
                      src={other.profilePicture || "/placeholder-avatar.png"}
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {other.fullName?.[0] || other.companyName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground dark:text-white">
                    {other.fullName || other.companyName}
                  </p>

                  <p className="truncate text-xs text-muted-foreground dark:text-white/60">
                    {lastMsg?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
