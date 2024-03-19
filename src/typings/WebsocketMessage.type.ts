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
 * 채팅방 목록 조회
 */
export type GetRoomsReq = {
  type: "GET_ROOMS_REQUEST";
};
export type GetRoomsRes = {
  type: "GET_ROOMS_RESPONSE";
  data: {
    rooms: {
      room: {
        id: string;
        name: string;
        participantCount: number;
      };
      message: {
        id: string;
        content: string;
        updatedAt: Date;
      };
    }[];
  };
};

/**
 * 채팅방 생성
 */
export type CreateRoomReq = {
  type: "CREATE_ROOM_REQUEST";
  data: {
    name: string;
    participants: number[];
  };
};
export type CreateRoomRes = {
  type: "CREATE_ROOM_RESPONSE";
  data: {
    roomId: string;
  };
};

/**
 * 채팅방 정보 조회
 */
export type GetRoomInfoReq = {
  type: "GET_ROOM_INFO_REQUEST";
  data: {
    roomId: string;
  };
};
export type GetRoomInfoRes = {
  type: "GET_ROOM_INFO_RESPONSE";
  data: {
    room: {
      id: string;
      name: string;
      participantCount: number;
    };
  };
};

/**
 * 채팅 메시지 송신
 */
export type SendMessageReq = {
  type: "SEND_MESSAGE_REQUEST";
  data: {
    roomId: string;
    message: string;
    type: "text" | "image" | "video";
  };
};
export type SendMessageRes = {
  type: "SEND_MESSAGE_RESPONSE";
  data: {
    isSuccess: boolean;
  };
};

/**
 * 채팅방 메시지 목록 조회
 */
export type ReceiveMessageInRoomReq = {
  type: "RECEIVE_MESSAGE_IN_ROOM_REQUEST";
  data: {
    roomId: string;
    messageId: string;
  };
};
export type ReceiveMessageInRoomRes = {
  type: "RECEIVE_MESSAGE_IN_ROOM_RESPONSE";
  data: {
    room: {
      id: string;
    };
    messages: TChatMessageDetail[];
  };
};

/**
 * 채팅방 열기
 */
export type OpenRoomReq = {
  type: "OPEN_ROOM_REQUEST";
  data: {
    roomId: string;
  };
};
export type OpenRoomRes = {
  type: "OPEN_ROOM_RESPONSE";
  data: {
    isSuccess: boolean;
  };
};

/**
 * 채팅방 닫기
 */
export type CloseRoomReq = {
  type: "CLOSE_ROOM_REQUEST";
  data: {
    roomId: string;
  };
};
export type CloseRoomRes = {
  type: "CLOSE_ROOM_RESPONSE";
  data: {
    isSuccess: boolean;
  };
};

/**
 * 채팅방 퇴장
 */
export type LeaveRoomReq = {
  type: "LEAVE_ROOM_REQUEST";
  data: {
    roomId: string;
  };
};
export type LeaveRoomRes = {
  type: "LEAVE_ROOM_RESPONSE";
  data: {
    isSuccess: boolean;
  };
};

/**
 * 채팅방 정보 변경
 */
export type RoomChanged = {
  type: "ROOM_CHANGED";
  data: {
    room: {
      id: string;
      name: string;
      memberSize: number;
      lastMessage: {
        id: number;
        content: string;
        updatedAt: Date;
      };
    };
  };
};

/**
 * 채팅방 메시지 수신 노티
 */
export type MessageCreated = {
  type: "MESSAGE_CREATED";
  data: {
    room: {
      id: string;
    };
  };
};
