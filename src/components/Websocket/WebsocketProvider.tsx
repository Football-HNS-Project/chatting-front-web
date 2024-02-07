import { createContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAtomValue } from "jotai";

import {
  CreateRoomReq,
  GetRoomsReq,
  TChatMessage,
  TLeaveRoom,
  TMessage,
  TRoom,
  TSendChatMessage,
} from "@typings/WebsocketMessage";

import { UserAtom } from "@stores/UserStore";

export type WebSocketContextProps = {
  rooms: TRoom[];
  currentRoom: TRoom | null;
  messages: TChatMessage[];
  getRooms: () => void;
  createRoom: (myId: number, userId: number) => void;
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
  const user = useAtomValue(UserAtom);
  const navigate = useNavigate();
  useEffect(() => {
    socketRef.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?userId=${user.id}`
    );
    socketRef.current.onopen = () => {
      console.log("WebSocket 연결");
      socketRef.current?.send(
        JSON.stringify({ type: "GET_ROOMS_REQUEST", data: {} } as GetRoomsReq)
      );
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
      console.log(event);
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
