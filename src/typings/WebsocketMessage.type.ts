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
  updatedAt: Date;
};
/**
 * 채팅 메시지 인터페이스
 */
export type TChatMessage = {
  roomId: string;
  messages: TChatMessageDetail[];
};
export type TChatMessageDetail = {
  id: string;
  type: string;
  sender: number;
  createdAt: Date;
  content: string;
  unReadCnt: number;
};

/**
 * 채팅방 목록 조회 REQ
 */
export type GetRoomsReq = {
  type: "GET_ROOMS_REQUEST";
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
 * 채팅방 내부 이전 메시지 조회 REQ
 */
export type GetMessagesHistoryReq = {
  type: "GET_MESSAGES_HISTORY_REQUEST";
  data: {
    roomId: string;
    messageId: string;
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
 * 채팅방 목록 조회 RES
 */
export type GetRoomsRes = {
  type: "GET_ROOMS_RESPONSE";
  data: TRoom[];
};
/**
 * 채팅방 생성 RES
 */
export type CreateRoomRes = {
  type: "CREATE_ROOM_RESPONSE";
  data: TRoom;
};
/**
 * 채팅방 내부 이전 메시지 조회 RES
 */
export type GetMessagesHistoryRes = {
  type: "GET_MESSAGES_HISTORY_RESPONSE";
  data: {
    room: {
      id: string;
    };
    messages: TChatMessageDetail[];
  };
};
/**
 * 채팅 메시지 수신 (in 채팅방) RES
 */
export type GetNewMessageInRoomRes = {
  type: "GET_NEW_MESSAGE_IN";
  data: {
    room: {
      id: string;
    };
    message: TChatMessageDetail;
  };
};
/**
 * 채팅 메시지 수신 (out 채팅방) RES
 */
export type GetNewMessageOutRoomRes = {
  type: "GET_NEW_MESSAGE_OUT";
  data: {
    room: {
      id: string;
      unReadCnt: number;
    };
    message: Pick<TChatMessageDetail, "id" | "type" | "createdAt" | "content">;
  };
};
