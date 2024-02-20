import { createContext, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtomValue } from "jotai";

import {
  CreateRoomReq,
  GetMessageListReq,
  GetRoomsReq,
  SendMessageReq,
  TChatMessage,
  TMessage,
  TRoom,
} from "@typings/WebsocketMessage";

import { UserAtom } from "@stores/UserStore";

export type WebSocketContextProps = {
  rooms: TRoom[];
  currentRoom: TRoom | null;
  messages: TChatMessage[];
  createRoom: (myId: number, userId: number) => void;
  getMessages: (roomId: string) => void;
  sendMessage: (payload: SendMessageReq) => void;
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
  const [currentRoom] = useState<TRoom | null>(null);
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const user = useAtomValue(UserAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    socketRef.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?userId=${user.id}`
    );
    socketRef.current.onopen = () => {
      console.log("WebSocket 연결");
      socketRef.current?.send(
        JSON.stringify({ type: "GET_ROOMS_REQUEST", data: {} } as GetRoomsReq)
      );
      if (id) {
        getMessages(String(id));
      }
    };

    socketRef.current.onmessage = (event) => {
      const response: TMessage = JSON.parse(event.data);
      switch (response.type) {
        // 채팅방 목록
        case "GET_ROOMS_RESPONSE":
          setRooms(response.data);
          break;
        case "CREATE_ROOM_RESPONSE":
          setRooms((prev) => [response.data, ...prev]);
          navigate(`/chatting/room/${response.data.id}`);
          break;
        // 메시지 목록
        case "RECEIVE_MESSAGES_IN_ROOM_RESPONSE":
          setMessages(response.data);
          break;
        // 메시지 수신
        case "RECEIVE_MESSAGE_IN_ROOMS":
          console.log(response.data);
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
  }, [user.id]);

  /**
   * 채팅방 생성
   */
  const createRoom = (myId: number, userId: number) => {
    const reqBody: CreateRoomReq = {
      type: "CREATE_ROOM_REQUEST",
      data: {
        name: "임시 방 이름",
        participants: [myId, userId],
      },
    };
    socketRef.current?.send(JSON.stringify(reqBody));
  };

  /**
   * 메시지 목록 가져오기
   */
  const getMessages = (roomId: string) => {
    socketRef.current?.send(
      JSON.stringify({
        type: "RECEIVE_MESSAGE_IN_ROOM",
        data: { id: roomId },
      } as GetMessageListReq)
    );
  };

  /**
   * 메시지 보내기
   */
  const sendMessage = (payload: SendMessageReq) => {
    socketRef.current?.send(JSON.stringify(payload));
  };

  return (
    <WebSocketContext.Provider
      value={{
        rooms,
        messages,
        currentRoom,
        createRoom,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
