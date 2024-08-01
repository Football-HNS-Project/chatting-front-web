import {
  CloseRoomReq,
  CloseRoomRes,
  GetRoomInfoReq,
  GetRoomInfoRes,
  GetRoomsReq,
  GetRoomsRes,
  LeaveRoomReq,
  LeaveRoomRes,
  MessageCreated,
  OpenRoomReq,
  OpenRoomRes,
  ReceiveMessagesInRoomReq,
  ReceiveMessagesInRoomRes,
  RoomChanged,
  SendMessageReq,
  SendMessageRes,
} from "@typings/WebsocketMessage.type";

type TChannel =
  | `${RoomChanged["type"]}_${string}`
  | `${MessageCreated["type"]}_${string}`;
// [todo] http 제거
type THttpChannel =
  | GetRoomsRes["type"]
  | GetRoomInfoRes["type"]
  | SendMessageRes["type"]
  | ReceiveMessagesInRoomRes["type"]
  | OpenRoomRes["type"]
  | CloseRoomRes["type"]
  | LeaveRoomRes["type"];

export type CallbackProps = RoomChanged["data"] | MessageCreated["data"];
// [todo] http 제거
export type HttpCallbackProps =
  | GetRoomsRes["data"]
  | GetRoomInfoRes["data"]
  | SendMessageRes["data"]
  | ReceiveMessagesInRoomRes["data"]
  | OpenRoomRes["data"]
  | CloseRoomRes["data"]
  | LeaveRoomRes["data"];

export type subscribeProps = {
  channel: TChannel | THttpChannel;
  callbackFn: (props: CallbackProps | HttpCallbackProps) => void;
};

export type unsubscribeProps = Omit<subscribeProps, "callbackFn">;

export type SendRequestProps =
  | GetRoomsReq
  | GetRoomInfoReq
  | SendMessageReq
  | ReceiveMessagesInRoomReq
  | OpenRoomReq
  | CloseRoomReq
  | LeaveRoomReq;

export type TSocketMessage =
  | RoomChanged
  | MessageCreated
  // [todo] http 제거
  | GetRoomsRes
  | GetRoomInfoRes
  | SendMessageRes
  | ReceiveMessagesInRoomRes
  | OpenRoomRes
  | CloseRoomRes
  | LeaveRoomRes;
