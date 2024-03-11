import { createContext, useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";

import { CreateRoomRes, GetRoomsRes } from "@typings/WebsocketMessage.type";
import {
  CallbackProps,
  SendRequestProps,
  TSocketMessage,
  subscribeProps,
  unsubscribeProps,
} from "@typings/WebsocketProvider.type";

import { UserAtom } from "@stores/UserStore";

type WebSocketContextProps = {
  isReady: boolean;
  subscribe: (props: subscribeProps) => void;
  unsubscribe: (props: unsubscribeProps) => void;
  sendRequest: (props: SendRequestProps) => void;
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
    [key: string]: (data: GetRoomsRes["data"] | CreateRoomRes["data"]) => void;
  }>({});
  const roomRef = useRef<{
    [key: string]: (data: CallbackProps) => void;
  }>({});

  /**
   * 구독하기
   */
  const subscribe = ({ type, channel, callbackFn }: subscribeProps) => {
    if (type === "room") {
      roomRef.current[channel] = callbackFn;
    } else {
      systemRef.current[channel] = callbackFn;
    }
  };
  /**
   * 구독 해제
   */
  const unsubscribe = ({ type, channel }: unsubscribeProps) => {
    if (type === "room") delete roomRef.current[channel];
    else delete systemRef.current[channel];
  };
  /**
   * 서버에 요청
   */
  const sendRequest = (props: SendRequestProps) => {
    ws.current?.send(JSON.stringify(props));
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
      const { type, data }: TSocketMessage = JSON.parse(event.data);
      switch (type) {
        // 채팅 방 외부(시스템) 관련 type
        case "GET_ROOMS_RESPONSE":
        case "CREATE_ROOM_RESPONSE": {
          const action = `${type}`;
          systemRef.current[action]?.(data);
          break;
        }
        // 채팅 방 내부(메시지) 관련 type
        case "RECEIVE_MESSAGE_IN_ROOM_RESPONSE":
        case "OPEN_ROOM_RESPONSE":
        case "GET_ROOM_INFO_RESPONSE":
        case "GET_NEW_MESSAGE_OUT":
        case "GET_NEW_MESSAGE_IN": {
          const action = `${type}_${data.room.id}`;
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

  return (
    <WebSocketContext.Provider
      value={{
        isReady,
        subscribe,
        unsubscribe,
        sendRequest,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
