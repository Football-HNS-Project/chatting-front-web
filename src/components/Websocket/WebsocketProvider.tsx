import { createContext, useEffect, useRef, useState } from "react";

import {
  CreateRoomReq,
  TChatMessage,
  TLeaveRoom,
  TMessage,
  TRoom,
  TSendChatMessage,
} from "@typings/WebsocketMessage";

export type WebSocketContextProps = {
  rooms: TRoom[];
  currentRoom: TRoom | null;
  messages: TChatMessage[];
  getRooms: () => void;
  createRoom: (myId: string, userId: string) => void;
  enterRoom: (userId: string) => void;
  leaveRoom: (payload: TLeaveRoom) => void;
  getMessages: (roomId: string) => void;
  sendMessage: (payload: TSendChatMessage) => void;
};

export const WebSocketContext = createContext<WebSocketContextProps>(
  {} as WebSocketContextProps
);

type WebsocketProviderProps = {
  children: React.ReactNode;
};

export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<TRoom | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://...");

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결");
      // [TODO] 초기 유저 인증/인가를 통해 RoomList를 받아와야함.
    };

    socketRef.current.onmessage = (event) => {
      const response: TMessage = JSON.parse(event.data);
      switch (response.type) {
        // 채팅방 목록
        case "rooms":
          setRooms(response.payload.rooms);
          break;
        // 메시지 목록
        case "message_list":
          setMessages(response.payload.messages);
          break;
        // 메시지
        case "get_message":
          setMessages((prev) => [...prev, response.payload.messages]);
          break;
      }
    };

    socketRef.current.onclose = (event) => {
      if (event.wasClean) {
        console.log("커넥션이 정상적으로 종료되었습니다.");
      } else {
        console.log("커넥션이 죽었습니다.");
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  /**
   * 채팅방 생성
   */
  const createRoom = (myId: string, userId: string) => {
    const reqBody: CreateRoomReq = {
      type: "create",
      payload: {
        name: userId,
        userId: [myId, userId],
      },
    };
    socketRef.current?.send(JSON.stringify(reqBody));
  };

  /**
   * 채팅방 입장
   */
  const enterRoom = (roomId: string) => {
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      setCurrentRoom(room);
      socketRef.current?.send(JSON.stringify({ type: "join", room: roomId }));
    }
  };

  /**
   * 채팅방 나가기
   */
  const leaveRoom = (payload: TLeaveRoom) => {
    if (currentRoom && currentRoom.id === payload.payload.roomId) {
      setCurrentRoom(null);
      socketRef.current?.send(JSON.stringify(payload));
    }
  };

  /**
   * 채팅방 목록 가져오기
   */
  const getRooms = () => {
    socketRef.current?.send(JSON.stringify({ type: "room_list" }));
  };

  /**
   * 메시지 목록 가져오기
   */
  const getMessages = (roomId: string) => {
    socketRef.current?.send(
      JSON.stringify({ type: "getMessages", room: roomId })
    );
  };

  /**
   * 메시지 보내기
   */
  const sendMessage = (payload: TSendChatMessage) => {
    socketRef.current?.send(JSON.stringify(payload));
  };

  return (
    <WebSocketContext.Provider
      value={{
        rooms,
        messages,
        currentRoom,
        createRoom,
        enterRoom,
        leaveRoom,
        getRooms,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
