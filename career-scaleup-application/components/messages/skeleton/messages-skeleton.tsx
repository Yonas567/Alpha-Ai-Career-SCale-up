import ProfileSectionSkeleton from "./profile-section-skeleton";
import ChatSkeleton from "./chat-skeleton";
import ChatHeaderSkeleton from "./chat-header-skeleton";
import RoomListSkeleton from "./room-list-skeleton";

export default function MessagesSkeleton() {
  return (
    <div className="flex h-full overflow-hidden bg-muted rounded-lg shadow-md">
      <RoomListSkeleton />

      <div className="flex-1 flex flex-col">
        <ChatHeaderSkeleton />
        <ChatSkeleton />
      </div>
      <ProfileSectionSkeleton />
    </div>
  );
}
