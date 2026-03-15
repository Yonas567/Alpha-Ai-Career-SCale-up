import axios from "axios";
import api from ".";
import { CreateConversationDto, User } from "../types";

export type Participant = {
  id: string;
  userId: string;
  conversationId: string;
  joinedAt: string;
  user?: Partial<User>;
};

export type Room = {
  id: string;
  applicationId: string;
  createdAt: Date;
  participants: Participant[];
  messages: Array<any>;
};

export const ChatApi = {
  getRooms: async () => {
    return api
      .get("/chat/room")
      .then((res) => res.data as Room[])
      .catch((error) => {
        throw new Error(error);
      });
  },

  createRoom: async (body: CreateConversationDto) => {
    return axios
      .post("/chat/room", body)
      .then((res) => res.data as Room)
      .catch((error) => {
        throw new Error(error);
      });
  },

  editMessage: async () => {},

  deleteMessage: async () => {},
};
 