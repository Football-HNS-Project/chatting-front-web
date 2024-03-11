import {
  CreateRoomReq,
  CreateRoomRes,
  GetMessagesHistoryReq,
  GetMessagesHistoryRes,
  GetNewMessageInRoomRes,
  GetNewMessageOutRoomRes,
  GetRoomInfoReq,
  GetRoomInfoRes,
  GetRoomsReq,
  GetRoomsRes,
  OpenRoomReq,
  OpenRoomRes,
  SendMessageReq,
} from "@typings/WebsocketMessage.type";

export type TSystemRef = GetRoomsRes["type"] | CreateRoomRes["type"];
export type TRoomRef =
  | `${GetMessagesHistoryRes["type"]}_${string}`
  | `${OpenRoomRes["type"]}_${string}`
  | `${GetRoomInfoRes["type"]}_${string}`
  | `${GetNewMessageInRoomRes["type"]}_${string}`
  | `${GetNewMessageOutRoomRes["type"]}_${string}`;

export type SendRequestProps =
  | GetRoomsReq
  | CreateRoomReq
  | OpenRoomReq
  | GetMessagesHistoryReq
  | GetRoomInfoReq
  | SendMessageReq;

export type TSocketMessage =
  | GetRoomsRes
  | CreateRoomRes
  | OpenRoomRes
  | GetMessagesHistoryRes
  | GetRoomInfoRes
  | GetNewMessageInRoomRes
  | GetNewMessageOutRoomRes;

export type CallbackProps =
  | GetRoomsRes["data"]
  | CreateRoomRes["data"]
  | OpenRoomRes["data"]
  | GetMessagesHistoryRes["data"]
  | GetRoomInfoRes["data"]
  | GetNewMessageInRoomRes["data"]
  | GetNewMessageOutRoomRes["data"];

export type subscribeProps = {
  type: "system" | "room";
  channel: TRoomRef | TSystemRef | string;
  callbackFn: (props: CallbackProps) => void;
};

export type unsubscribeProps = Omit<subscribeProps, "callbackFn">;
