import {
  CloseRoomReq,
  CloseRoomRes,
  CreateRoomReq,
  CreateRoomRes,
  GetRoomInfoReq,
  GetRoomInfoRes,
  GetRoomsReq,
  GetRoomsRes,
  LeaveRoomReq,
  LeaveRoomRes,
  MessageCreated,
  OpenRoomReq,
  OpenRoomRes,
  ReceiveMessageInRoomReq,
  ReceiveMessageInRoomRes,
  RoomChanged,
  SendMessageReq,
  SendMessageRes,
} from "@typings/WebsocketMessage.type";

type TChannel = RoomChanged["type"] | MessageCreated["type"];
// [todo] http 제거
type THttpChannel =
  | GetRoomsRes["type"]
  | CreateRoomRes["type"]
  | GetRoomInfoRes["type"]
  | SendMessageRes["type"]
  | ReceiveMessageInRoomRes["type"]
  | OpenRoomRes["type"]
  | CloseRoomRes["type"]
  | LeaveRoomRes["type"];

export type CallbackProps = RoomChanged["data"] | MessageCreated["data"];
// [todo] http 제거
export type HttpCallbackProps =
  | GetRoomsRes["data"]
  | CreateRoomRes["data"]
  | GetRoomInfoRes["data"]
  | SendMessageRes["data"]
  | ReceiveMessageInRoomRes["data"]
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
  | CreateRoomReq
  | GetRoomInfoReq
  | SendMessageReq
  | ReceiveMessageInRoomReq
  | OpenRoomReq
  | CloseRoomReq
  | LeaveRoomReq;

export type TSocketMessage =
  | RoomChanged
  | MessageCreated
  // [todo] http 제거
  | GetRoomsRes
  | CreateRoomRes
  | GetRoomInfoRes
  | SendMessageRes
  | ReceiveMessageInRoomRes
  | OpenRoomRes
  | CloseRoomRes
  | LeaveRoomRes;
