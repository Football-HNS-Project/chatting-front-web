import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useHeartbeatInterval } from "@hooks/useHeartbeatInterval";

import {
  CallbackProps,
  SendRequestProps,
  TSocketMessage,
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
  const subscribers = useRef<{
    [key: string]: Set<(data: CallbackProps) => void>;
  }>({});

  const connect = useCallback(() => {
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

    ws.current.onclose = (event) => {
      setIsReady(false);
      console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
      setTimeout(connect, 5000);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const message: TSocketMessage = JSON.parse(event.data);
        const channel = message.type;
        if (subscribers.current[channel]) {
          console.log(
            "Subscribers for channel:",
            channel,
            subscribers.current[channel]
          );
          subscribers.current[channel].forEach((callback) =>
            callback(message.data)
          );
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  // 메모리 누수 방지
  const cleanup = useCallback(() => {
    subscribers.current = {};
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // 구독 함수
  const subscribe = useCallback(({ channel, callbackFn }: subscribeProps) => {
    if (!subscribers.current[channel]) {
      subscribers.current[channel] = new Set();
    }
    subscribers.current[channel].add(callbackFn);
    console.log(
      `Subscribed to ${channel}. Total subscribers:`,
      subscribers.current[channel].size
    );
  }, []);

  // 구독 해제 함수
  const unsubscribe = useCallback(({ channel }: unsubscribeProps) => {
    if (subscribers.current[channel]) {
      delete subscribers.current[channel];
      console.log(`Unsubscribed from ${channel}. Channel removed.`);
    }
  }, []);

  // 웹소켓 요청 함수
  const sendRequest = useCallback(
    (props: SendRequestProps) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current?.send(JSON.stringify(props));
      } else {
        console.error("WebSocket is not connected. Attempting to reconnect...");
        connect();
      }
    },
    [connect]
  );

  // 하트비트 주기 설정
  useHeartbeatInterval(
    () => {
      sendRequest({ type: "HEART_BEAT" });
    },
    isReady ? 40000 : null
  );

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
