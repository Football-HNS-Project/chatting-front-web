import { TLastMessage } from "@typings/Chat";
import { TUser } from "@typings/User";

export type TRoom = {
  id: string;
  name: string;
  members: Omit<TUser, "email">[];
  createdAt: string;
  latestMessage: TLastMessage;
  unread: number;
};

export type TRoomInfo = {
  id: string;
  name: string;
  memberSize: number;
};

export type TRoomType = "GROUP" | "DIRECT";
