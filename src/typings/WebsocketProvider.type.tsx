import {
  CreateRoomReq,
  CreateRoomRes,
  GetMessagesHistoryReq,
  GetMessagesHistoryRes,
  GetNewMessageInRoomRes,
  GetNewMessageOutRoomRes,
  GetRoomsReq,
  GetRoomsRes,
  SendMessageReq,
} from "@typings/WebsocketMessage.type";

export type TSystemRef = GetRoomsRes["type"] | CreateRoomRes["type"];
export type TRoomRef =
  | `${GetMessagesHistoryRes["type"]}_${string}`
  | `${GetNewMessageInRoomRes["type"]}_${string}`
  | `${GetNewMessageOutRoomRes["type"]}_${string}`;

export type SendRequestProps =
  | GetRoomsReq
  | CreateRoomReq
  | GetMessagesHistoryReq
  | SendMessageReq;

export type TSocketMessage =
  | GetRoomsRes
  | CreateRoomRes
  | GetMessagesHistoryRes
  | GetNewMessageInRoomRes
  | GetNewMessageOutRoomRes;

export type CallbackProps =
  | GetRoomsRes["data"]
  | CreateRoomRes["data"]
  | GetMessagesHistoryRes["data"]
  | GetNewMessageInRoomRes["data"]
  | GetNewMessageOutRoomRes["data"];

export type subscribeProps = {
  type: "system" | "room";
  channel: TRoomRef | TSystemRef | string;
  callbackFn: (props: CallbackProps) => void;
};

export type unsubscribeProps = Omit<subscribeProps, "callbackFn">;
