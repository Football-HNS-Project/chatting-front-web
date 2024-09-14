import { TLastMessage } from "@typings/Chat";

export type TRoom = {
  id: string;
  name: string;
  memberIds: string[];
  createdAt: string;
  latestMessage?: TLastMessage;
  unread: number;
};

export type TRoomType = "GROUP" | "DIRECT";
