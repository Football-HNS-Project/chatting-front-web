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
  memberSize: number;
  name: string;
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
 * 채팅방을 입장할 때 인터페이스
 */
export type TJoinRoom = {
  type: "join";
  user: TUser;
  payload: {
    roomId: string;
  };
};

/**
 * 채팅방을 나갈 때 인터페이스
 */
export type TLeaveRoom = {
  type: "leave";
  user: TUser;
  payload: {
    roomId: string;
  };
};

/**
 * 채팅방을 삭제할 때 인터페이스
 */
export type TDeleteRoom = {
  type: "delete";
  payload: {
    roomId: string;
  };
};

/**
 * 채팅 메시지를 받기 위한 인터페이스
 */
export type TMessageList = {
  type: "message_list";
  payload: {
    roomId: string;
    sender: TUser;
    messages: TChatMessage[];
  };
};

/**
 * 채팅 메시지를 보내기 위한 인터페이스
 */
export type TSendChatMessage = {
  type: "send_message";
  payload: {
    roomId: string;
    message: string;
    type: "text" | "image" | "video";
  };
};

/**
 * 채팅 메시지를 받기 위한 인터페이스
 */
export type TGetChatMessage = {
  type: "get_message";
  payload: {
    roomId: string;
    sender: TUser;
    messages: TChatMessage;
  };
};

/**
 * 채팅 메시지 인터페이스
 */
export type TChatMessage = {
  message: string;
  timestamp: Date;
  type: "text" | "image" | "video";
};

export type TMessage =
  | GetRoomsReq
  | GetRoomsRes
  | CreateRoomReq
  | CreateRoomRes
  | TJoinRoom
  | TLeaveRoom
  | TDeleteRoom
  | TMessageList
  | TSendChatMessage
  | TGetChatMessage;
