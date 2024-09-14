import { TUser } from "@typings/User";

export type TChatMessageDetail = {
  id: string;
  roomId: string;
  messageType: TMessageType;
  senderType: TSenderType;
  sender: Omit<TUser, "email">;
  createdAt: string;
  updatedAt: string;
  plainText: string;
  files: TFile[];
  options: string[];
  reactions: string[];
  replyTo: string | null;
};

type TFile = {
  id: string;
  name: string;
  size: number;
  mimType: string;
  url: string;
  uploadedAt: Date;
};

export type TLastMessage = {
  id: string;
  messageType: TMessageType;
  senderType: TSenderType;
  senderId: string;
  createdAt: string;
  plainText: string;
};
export type TMessageType = "TEXT" | "IMAGE" | "FILE";
export type TSenderType = "USER" | "SYSTEM";
