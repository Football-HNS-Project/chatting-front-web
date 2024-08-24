import { createContext, useEffect, useRef, useState } from "react";

import {
  CallbackProps,
  HttpCallbackProps,
  SendRequestProps,
  subscribeProps,
  unsubscribeProps,
} from "@typings/WebsocketProvider.type";

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
  const [isReady, setIsReady] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const ref = useRef<{
    [key: string]: (data: CallbackProps | HttpCallbackProps) => void;
  }>({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Unable to connect to WebSocket.");
      return;
    }

    ws.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?token=${accessToken}`
    );

    ws.current.onopen = () => {
      setIsReady(true);
      console.log("WebSocket connection opened");
    };

    ws.current.onclose = () => {
      setIsReady(false);
      console.log("WebSocket connection closed");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      console.log(event);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  /**
   * 구독하기
   */
  const subscribe = ({ channel, callbackFn }: subscribeProps) => {
    ref.current[channel] = callbackFn;
  };
  /**
   * 구독 해제
   */
  const unsubscribe = ({ channel }: unsubscribeProps) => {
    delete ref.current[channel];
  };
  /**
   * 서버에 요청
   */
  const sendRequest = (props: SendRequestProps) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current?.send(JSON.stringify(props));
    } else {
      console.error("Websocket is not connected");
    }
  };

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
