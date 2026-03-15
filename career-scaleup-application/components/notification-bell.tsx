import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/app/types";
import { useEffect } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useIsMobile } from "@/hooks/use-mobile";

type Notification = {
  id: string;
  userId: string;
  user: User;

  type: "NEW_MESSAGE";

  title: string;
  message: string;
  metaData: any;
  isRead: boolean;
  createdAt: Date;
  readAt: Date;
};

export function NotificationBell() {
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const isMobile = useIsMobile();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axios
        .get("/api/notifications")
        .then((response) => response.data as Notification[])
        .catch((error) => {
          throw new Error(error);
        });

      return res;
    },
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("newNotification", (notification) => {
      queryClient.setQueryData(
        ["notifications"],
        (old: Notification[] = []) => [notification, ...old]
      );
    });

    return () => {
      socket.off("newNotification");
    };
  }, [socket]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative rounded-md">
          <Bell size={22} />

          {notifications && (
            <>
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </>
          )}
          {!isMobile && <span>Notifications</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3 font-semibold">Notifications</div>

        <div className="max-h-80 overflow-y-auto">
          {notifications && (
            <>
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="cursor-pointer border-b px-4 py-3 last:border-b-0 hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
