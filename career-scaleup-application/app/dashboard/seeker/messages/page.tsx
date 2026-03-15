"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatApi, Room } from "@/app/api/chat";
import { ProfileApi } from "@/app/api/profile";
import { useSocket } from "@/context/SocketProvider";
import RoomList from "@/components/messages/room-list";
import Chat from "@/components/messages/chat";
import MessagesSkeleton from "@/components/messages/skeleton/messages-skeleton";
import ChatHeader from "@/components/messages/chat-header";
import ProfileSection from "@/components/messages/profile-section";
import EmptyChatState from "@/components/messages/empty-chat-state";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Messages() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const { socket } = useSocket();
  const isMobile = useIsMobile();

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileApi.getProfile,
  });

  const { data: rooms, isLoading: loadingRooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: ChatApi.getRooms,
  });

  useEffect(() => {
    if (!isMobile && rooms && rooms.length > 0 && !activeRoom) {
      setActiveRoom(rooms[0]);
      socket?.emit("joinRoom", { conversationId: rooms[0].id });
    }
  }, [rooms, activeRoom, socket, isMobile]);

  const handleRoomSelection = (room: Room) => {
    setActiveRoom(room);
    socket?.emit("joinRoom", { conversationId: room.id });
  };

  const handleBack = () => {
    setActiveRoom(null);
  };

  if (loadingProfile || loadingRooms || !profile || !rooms) {
    return <MessagesSkeleton />;
  }

  return (
    <div
      className={`flex ${
        isMobile ? "" : "space-x-4"
      } h-full overflow-hidden rounded-lg`}
    >
      {(!isMobile || !activeRoom) && (
        <div className="w-96 h-full">
          <RoomList
            rooms={rooms}
            profile={profile}
            activeRoomId={activeRoom?.id}
            onSelectRoom={handleRoomSelection}
          />
        </div>
      )}

      {activeRoom && (
        <div className="flex-1 flex flex-col border rounded-lg">
          <ChatHeader
            room={activeRoom}
            profile={profile}
            onBack={isMobile ? handleBack : undefined}
          />

          <Chat
            key={activeRoom.id}
            room={activeRoom}
            initialMessages={activeRoom.messages}
            profile={profile}
          />
        </div>
      )}

      {activeRoom && !isMobile && (
        <div className="w-96">
          <ProfileSection room={activeRoom} profile={profile} />
        </div>
      )}

      {!activeRoom && rooms.length === 0 && <EmptyChatState />}
    </div>
  );
}
