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
  const isConnecting = useRef(false);
  const subscribers = useRef<{
    [key: string]: Set<(data: CallbackProps) => void>;
  }>({});
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 2;

  const reconnect = useCallback(() => {
    if (isConnecting.current) return; // 이미 연결 시도 중이면 추가 시도를 하지 않음

    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log("웹소켓 최대 연결 횟수 도달... 연결 중지");
      return;
    }

    const backoffTime = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
    setTimeout(() => {
      if (!isConnecting.current) {
        // 타이머 실행 시점에도 연결 중이 아닌지 확인
        connect();
        reconnectAttempts.current++;
      }
    }, backoffTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(() => {
    if (isConnecting.current || ws.current?.readyState === WebSocket.OPEN)
      return;

    isConnecting.current = true;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Unable to connect to WebSocket.");
      isConnecting.current = false;
      return;
    }

    ws.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?token=${accessToken}`
    );

    ws.current.onopen = () => {
      setIsReady(true);
      isConnecting.current = false;
      console.log("⭐️ WebSocket connection opened ⭐️");
    };

    ws.current.onclose = (event) => {
      setIsReady(false);
      isConnecting.current = false;
      console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
      reconnect();
    };

    ws.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      setIsReady(false);
      isConnecting.current = false;
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const message: TSocketMessage = JSON.parse(event.data);
        const channel = message.type;
        if (subscribers.current[channel]) {
          subscribers.current[channel].forEach((callback) =>
            callback(message.data)
          );
        }
        if (subscribers.current[channel]) {
          subscribers.current[channel].forEach((callback) =>
            callback(message.data)
          );
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
  }, [reconnect]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      isConnecting.current = false; // cleanup 시 연결 상태 초기화
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

    subscribers.current[channel]!.add(callbackFn);
    console.log(`⭕️ ${channel} 구독. Total subscribers:`, subscribers.current);
  }, []);

  // 구독 해제 함수
  const unsubscribe = useCallback(
    ({ channel, callbackFn }: unsubscribeProps) => {
      if (subscribers.current[channel]) {
        subscribers.current[channel]!.delete(callbackFn);
        if (subscribers.current[channel]!.size === 0) {
          delete subscribers.current[channel];
        }
        console.log(
          `❌ ${channel} 구독 해제. Total subscribers:`,
          subscribers.current
        );
      }
    },
    []
  );

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
