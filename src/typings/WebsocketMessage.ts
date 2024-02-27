/**
 * 유저 인터페이스
 */
export type TUser = {
  id: string;
  name: string;
};
/**
 * 채팅방 인터페이스
 */
export type TRoom = {
  id: string;
  name: string;
  memberSize: number;
  message: string;
  updated: Date;
};
/**
 * 채팅 메시지 인터페이스
 */
export type TChatMessage = {
  id: string;
  messageType: string;
  sender: number;
  createdAt: Date;
  content: string;
};

/**
 * 채팅방 목록 조회 REQ
 */
export type GetRoomsReq = {
  type: "GET_ROOMS_REQUEST";
  data: object;
};

/**
 * 채팅방 목록 조회 RES
 */
export type GetRoomsRes = {
  type: "GET_ROOMS_RESPONSE";
  data: TRoom[];
};

/**
 * 채팅방 생성 REQ
 */
export type CreateRoomReq = {
  type: "CREATE_ROOM_REQUEST";
  data: {
    name: string;
    participants: number[];
  };
};

/**
 * 채팅방 생성 RES
 */
export type CreateRoomRes = {
  type: "CREATE_ROOM_RESPONSE";
  data: TRoom;
};

/**
 * 채팅방 내부 메시지 수신 REQ
 */
export type GetMessageListReq = {
  type: "RECEIVE_MESSAGE_IN_ROOM";
  data: {
    id: string;
  };
};

/**
 * 채팅방 내부 메시지 목록 수신 RES
 */
export type GetMessageListRes = {
  type: "RECEIVE_MESSAGES_IN_ROOM_RESPONSE";
  data: {
    roomId: string;
    content: TChatMessage[];
  };
};

/**
 * 채팅 메시지 송신 REQ
 */
export type SendMessageReq = {
  type: "SEND_MESSAGE_REQUEST";
  data: {
    roomId: string;
    message: string;
    type: "text" | "image" | "video";
  };
};

/**
 * 채팅 메시지 수신 RES
 */
export type ReceiveMessageRes = {
  type: "RECEIVE_MESSAGE_IN_ROOMS";
  data: {
    roomId: string;
    sender: string;
    content: string;
    updatedAt: Date;
  };
};

type TSystemRef =
  | "RECEIVE_MESSAGES_IN_ROOM_RESPONSE"
  | "RECEIVE_MESSAGE_IN_ROOMS";
type TRoomRef = "GET_ROOMS_RESPONSE" | "CREATE_ROOM_RESPONSE";

export type TMessageResType = TSystemRef | TRoomRef;
export type TMessageReqType =
  | "GET_ROOMS_REQUEST"
  | "CREATE_ROOM_REQUEST"
  | "CREATE_ROOM_REQUEST"
  | "SEND_MESSAGE_REQUEST";

export type TMessageReq =
  | GetRoomsReq
  | CreateRoomReq
  | GetMessageListReq
  | SendMessageReq;

export type TMessageRes =
  | GetRoomsRes
  | CreateRoomRes
  | GetMessageListRes
  | ReceiveMessageRes;
