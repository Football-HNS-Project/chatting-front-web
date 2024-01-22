/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useRef, useState } from "react";

type TMessage = {
  room: string; // 채팅방 이름
  user: string; // 사용자 이름
  message: string; // 메시지 내용
  timestamp: string[]; // 메시지 시간
};
type TRoom = {
  name: string; // 채팅방 이름
  messages: TMessage[]; // 채팅방의 메시지 목록
};

type WebSocketContextProps = {
  rooms: TRoom[];
  messages: TMessage[];
  getRooms: () => void;
  getMessages: (room: string) => void;
  sendMessage: (room: string, user: string, message: string) => void;
};

export const WebSocketContext = createContext<WebSocketContextProps | null>(
  null
);

type WebsocketProviderProps = {
  children: React.ReactNode;
};
export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://...");

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결");
    };

    socketRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "roomList") {
        setRooms(response.rooms);
      } else if (response.type === "messageList") {
        // [TODO] 수정
        setMessages(response.messages);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const getRooms = () => {
    const message = {
      type: "getRooms",
    };
    socketRef.current?.send(JSON.stringify(message));
  };

  const getMessages = (room: string) => {
    const message = {
      type: "getMessages",
      room: room,
    };
    socketRef.current?.send(JSON.stringify(message));
  };

  const sendMessage = (room: string, user: string, text: string) => {
    const message = {
      type: "message",
      room: room,
      user: user,
      text: text,
    };
    socketRef.current?.send(JSON.stringify(message));
  };

  return (
    <WebSocketContext.Provider
      value={{ rooms, messages, getRooms, getMessages, sendMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
