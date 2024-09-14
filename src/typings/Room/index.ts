import { TUser } from "@typings/User";

export type TRoom = {
  id: string;
  name: string;
  members: Omit<TUser, "email">[];
  createdAt: string;
  latestMessage: {
    id: string;
    messageType: "TEXT" | "IMAGE" | "FILE";
    senderType: "USER" | "SYSTEM";
    senderId: string;
    createdAt: string;
    plainText: string;
  };
  unread: number;
};

export type TRoomInfo = {
  id: string;
  name: string;
  memberSize: number;
};
