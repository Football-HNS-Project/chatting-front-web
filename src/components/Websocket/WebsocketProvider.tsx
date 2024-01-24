import { createContext, useEffect, useRef, useState } from "react";

import {
  TChatMessage,
  TLeaveRoom,
  TMessage,
  TRoom,
  TSendChatMessage,
} from "@typings/WebsocketMessage";

type WebSocketContextProps = {
  rooms: TRoom[];
  currentRoom: TRoom | null;
  messages: TChatMessage[];
  getRooms: () => void;
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
    };

    socketRef.current.onmessage = (event) => {
      const response: TMessage = JSON.parse(event.data);
      switch (response.type) {
        // 채팅방 목록
        case "room_list":
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

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

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
