/**
 * 유저 인터페이스
 */
export type TUser = {
  id: string;
  name: string;
};

/**
 * 채팅방을 생성할 때 인터페이스
 */
export type CreateRoomReq = {
  type: "CREATE_ROOM";
  data: {
    name: string;
    participants: string[];
  };
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
 * 채팅방 생성했을 때 인터페이스
 */
export type GetRoomRes = {
  type: "GET_ROOM_RES";
  data: TRoom;
};

/**
 * 채팅방 목록을 불러올 때 인터페이스
 */
export type GetRoomListRes = {
  type: "GET_ROOMS_RES";
  data: TRoom[];
};

/**
 * 채팅방 인터페이스
 */
export type TRoom = {
  id: string;
  userSize: number;
  name: string;
  // lastMessage: string;
  // updatedAt: Date;
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
  | TJoinRoom
  | TLeaveRoom
  | TDeleteRoom
  | GetRoomListRes
  | TMessageList
  | TSendChatMessage
  | TGetChatMessage;
