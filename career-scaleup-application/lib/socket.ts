import { BASE_URL } from "@/app/constants";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (conversationId: string) => {
  if (!socket) {
    socket = io(`${BASE_URL}`, {
      transports: ["websocket"],
      query: { conversationId},
    });
  }
  return socket;
};

export const getSocket = () => socket;
