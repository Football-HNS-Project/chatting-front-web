import { createContext, useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";

import {
  TChatMessage,
  TMessageReq,
  TMessageRes,
  TMessageResType,
  TRoom,
} from "@typings/WebsocketMessage";

import { UserAtom } from "@stores/UserStore";

type WebSocketContextProps = {
  isReady: boolean;
  subscribe: (
    channel: TMessageResType,
    callback: (data: TRoom[] | TRoom) => void
  ) => void;
  unsubscribe: (channel: TMessageResType) => void;
  sendRequest: (data: TMessageReq) => void;
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
  const user = useAtomValue(UserAtom);
  const [isReady, setIsReady] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const systemRef = useRef<{
    [key: string]: (data: TRoom | TRoom[]) => void;
  }>({});
  const roomRef = useRef<{
    [key: string]: (
      data: { roomId: string; content: TChatMessage[] } | TChatMessage
    ) => void;
  }>({});

  const subscribe = (
    channel: TMessageResType,
    callback: (data: TRoom | TRoom[]) => void
  ) => {
    systemRef.current[channel] = callback;
  };
  const unsubscribe = (channel: TMessageResType) => {
    delete systemRef.current[channel];
  };
  const sendRequest = (data: TMessageReq) => {
    ws.current?.send(JSON.stringify(data));
  };

  useEffect(() => {
    ws.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?userId=${user.id}`
    );

    ws.current.onopen = () => {
      setIsReady(true);
      console.log("socket open");
    };

    ws.current.onclose = () => {
      setIsReady(false);
      console.log("socket close");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const { type, data }: TMessageRes = JSON.parse(event.data);
      switch (type) {
        // 채팅 방 외부(시스템) 관련 type
        case "GET_ROOMS_RESPONSE":
        case "CREATE_ROOM_RESPONSE": {
          const action = `${type}`;
          if (systemRef.current[action]) {
            systemRef.current[action](data);
          } else {
            systemRef.current[action]?.(data);
          }
          break;
        }
        // 채팅 방 내부(메시지) 관련 type
        case "RECEIVE_MESSAGES_IN_ROOM_RESPONSE":
        case "RECEIVE_MESSAGE_IN_ROOMS": {
          const action = `${type}_${data.roomId}`;
          roomRef.current[action]?.(data);
          break;
        }
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user.id]);

  const ret = {
    isReady,
    subscribe,
    unsubscribe,
    sendRequest,
  };

  return (
    <WebSocketContext.Provider value={ret}>
      {children}
    </WebSocketContext.Provider>
  );
};
