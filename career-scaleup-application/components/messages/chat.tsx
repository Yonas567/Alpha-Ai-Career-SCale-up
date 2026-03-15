"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, Send, X } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { User } from "@/app/types";
import { ChatApi, Room } from "@/app/api/chat";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  attachments?: Attachment | null;
  createdAt: Date;
  readAt: null;
}

interface Attachment {
  url: string;
  name: string;
  type: string;
}

export default function Chat({
  room,
  initialMessages,
  profile,
}: {
  room: Room;
  initialMessages: Message[];
  profile: any;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [receiverId, setReceiverId] = useState<string>("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  useEffect(() => {
    setMessages(initialMessages);

    const receiver = room?.participants.find(
      (participant) => participant.user?.id != profile.id
    );

    if (receiver) {
      setReceiverId(receiver.user?.id!);
    }
    setTimeout(() => bottomRef.current?.scrollIntoView(), 50);
  }, [room, initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      if (msg.conversationId === room.id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, room]);

  const sendMessage = () => {
    if (isUploading) return;
    if ((!text.trim() && !attachment) || !socket) return;

    const validAttachment = attachment?.url ? attachment : null;

    const tempMessage: Message = {
      id: Date.now().toString(),
      senderId: profile.id,
      receiverId,
      conversationId: room.id,
      content: text,
      attachments: validAttachment,
      createdAt: new Date(),
      readAt: null,
    };

    socket.emit("sendMessage", tempMessage);

    setText("");
    setAttachment(null);
  };

  const handleFileAttach = async (file: File) => {
    setIsUploading(true);

    const fileName = `${Date.now()}-${file.name
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "_")}`;

    const interval = setInterval(() => {
      setUploadProgress((p) => (p < 90 ? p + 10 : p));
    }, 150);

    const { error } = await supabase.storage
      .from("Message_Attachments")
      .upload(fileName, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type,
      });

    clearInterval(interval);

    if (error) {
      console.error("Upload failed:", error.message);
      setIsUploading(false);
      setUploadProgress(0);
      return;
    }

    const { data } = supabase.storage
      .from("Message_Attachments")
      .getPublicUrl(fileName);

    if (data?.publicUrl) {
      setAttachment({
        url: data.publicUrl,
        name: file.name,
        type: file.type,
      });
    }

    setUploadProgress(100);
    setTimeout(() => setUploadProgress(0), 400);
    setIsUploading(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scroll bg-card ">
        {messages.map((msg) => {
          return <MessageBubble key={msg.id} message={msg} profile={profile} />;
        })}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border bg-card  px-4 py-4 rounded-b-md">
        {(isUploading || attachment) && (
          <div className="mb-2 flex items-center gap-3 px-3 py-2 border rounded-md text-sm">
            <span className="truncate w-fit">
              {attachment?.name || "Uploading file..."}
            </span>

            {isUploading ? (
              <span className="text-xs text-muted-foreground">
                {uploadProgress}%
              </span>
            ) : (
              <Button variant="ghost" onClick={() => setAttachment(null)}>
                <X className="w-4 h-4 text-red-500 text-xs" />
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2 rounded-md"
            onClick={() => inputRef.current?.click()}
          >
            <PaperclipIcon className="w-8 h-8" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="rounded-full bg-background  border-border"
          />

          <Button
            onClick={sendMessage}
            className="rounded-full p-2 w-10 h-10 bg-[#4d32fb] hover:bg-[#4d32fb]/90 dark:bg-[#4d32fb] dark:hover:bg-[#4d32fb]/90"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFileAttach(e.target.files[0])}
      />
    </>
  );
}
interface MessageBubbleProps {
  message: Message;
  profile: User;
}

export function MessageBubble({ message, profile }: MessageBubbleProps) {
  const isSender = message.senderId === profile.id;
  const attachment = message.attachments;
  const isImage = attachment?.type?.startsWith("image");

  console.log("Attachment in MessageBubble:", attachment);

  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`
          max-w-[70%] rounded-2xl px-4 py-3 mb-3 space-y-2
          ${
            isSender
              ? "bg-[#4d32fb] text-white"
              : "bg-card border border-border dark:bg-white/10 dark:border-white/20 text-foreground dark:text-white"
          }
        `}
      >
        {/* Attachment first */}
        {attachment && (
          <>
            {isImage ? (
              <img
                src={attachment.url}
                alt={attachment.name}
                className="rounded-lg max-h-48 w-full object-cover"
              />
            ) : (
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2 text-sm max-w-full
                  ${
                    isSender
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-muted text-foreground dark:bg-white/15 dark:text-white hover:bg-white/25"
                  }
                `}
              >
                📎{" "}
                <span className="truncate max-w-[150px]">
                  {attachment.name}
                </span>
              </a>
            )}
          </>
        )}

        {/* Message content below attachment */}
        {message.content && (
          <p className="text-sm break-words">{message.content}</p>
        )}

        {/* Timestamp */}
        <p
          className={`text-xs text-right ${
            isSender ? "opacity-80" : "opacity-70 dark:opacity-60"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
