import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { instance } from "@apis/AxiosInstance";

import { useHeartbeatInterval } from "@hooks/useHeartbeatInterval";

import {
  CallbackProps,
  SendRequestProps,
  WebSocketConnectionState,
  subscribeProps,
  unsubscribeProps,
} from "@typings/WebsocketProvider.type";

type WebSocketContextProps = {
  isReady: boolean;
  connectionState: WebSocketConnectionState;
  subscribe: (props: subscribeProps) => void;
  unsubscribe: (props: unsubscribeProps) => void;
  sendRequest: (props: SendRequestProps) => void;
  reconnect: () => void;
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
  const [connectionState, setConnectionState] = useState<WebSocketConnectionState>("DISCONNECTED");
  const ws = useRef<WebSocket | null>(null);
  const isConnecting = useRef(false);
  const subscribers = useRef<{
    [key: string]: Set<(data: CallbackProps) => void>;
  }>({});
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 10; // 최대 재연결 시도 횟수 증가
  const messageQueue = useRef<SendRequestProps[]>([]);
  const connectionTimeout = useRef<NodeJS.Timeout | null>(null);

  const resetConnectionTimeout = useCallback(() => {
    if (connectionTimeout.current) {
      clearTimeout(connectionTimeout.current);
    }
    // 연결 상태 감시 타이머 설정 (30초 후에 재연결 시도)
    connectionTimeout.current = setTimeout(() => {
      if (ws.current?.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection timeout, attempting to reconnect...");
        setConnectionState("CONNECTION_ERROR");
        reconnect();
      }
    }, 30000);
  }, []);

  const handleTokenExpiration = useCallback(async () => {
    try {
      setConnectionState("REFRESHING_TOKEN");
      // 토큰 갱신 요청
      const { accessToken: newAccessToken } = await instance.post<
        object,
        { accessToken: string }
      >("/tokens/reissue");

      // 새로운 토큰 저장
      localStorage.setItem("accessToken", newAccessToken);

      // axios 인스턴스의 헤더 업데이트
      instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      // 웹소켓 재연결 시도
      if (ws.current) {
        ws.current.close(); // 기존 연결 종료
      }
      reconnectAttempts.current = 0;
      setConnectionState("RECONNECTING");
      connect(); // 새로운 토큰으로 재연결

      return true;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      setConnectionState("AUTH_ERROR");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reconnect = useCallback(() => {
    if (isConnecting.current) return;

    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log("웹소켓 최대 연결 횟수 도달... 연결 중지");
      setConnectionState("MAX_RETRIES_EXCEEDED");
      return;
    }

    // 지수 백오프 알고리즘으로 재시도 간격 조정 (최대 30초)
    const backoffTime = Math.min(1000 * Math.pow(1.5, reconnectAttempts.current), 30000);
    setConnectionState("RECONNECTING");
    
    setTimeout(() => {
      if (!isConnecting.current) {
        connect();
        reconnectAttempts.current++;
      }
    }, backoffTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processPendingMessages = useCallback(() => {
    if (messageQueue.current.length > 0 && ws.current?.readyState === WebSocket.OPEN) {
      console.log(`Processing ${messageQueue.current.length} pending messages`);
      
      // 큐에 있는 메시지 전송
      messageQueue.current.forEach(message => {
        ws.current?.send(JSON.stringify(message));
      });
      
      // 큐 비우기
      messageQueue.current = [];
    }
  }, []);

  const connect = useCallback(() => {
    if (isConnecting.current || ws.current?.readyState === WebSocket.OPEN)
      return;

    isConnecting.current = true;
    setConnectionState("CONNECTING");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Unable to connect to WebSocket.");
      isConnecting.current = false;
      setConnectionState("AUTH_ERROR");
      return;
    }

    // 연결 시작 시 타임아웃 설정
    resetConnectionTimeout();

    ws.current = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET}?token=${accessToken}`
    );

    ws.current.onopen = () => {
      setIsReady(true);
      isConnecting.current = false;
      reconnectAttempts.current = 0;
      setConnectionState("CONNECTED");
      console.log("⭐️ WebSocket connection opened ⭐️");
      
      // 보류 중인 메시지 처리
      processPendingMessages();
    };

    ws.current.onclose = (event) => {
      setIsReady(false);
      isConnecting.current = false;
      console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
      
      // 1000(정상종료) 외의 코드로 연결이 종료된 경우 자동 재연결
      if (event.code !== 1000) {
        setConnectionState("DISCONNECTED");
        reconnect();
      } else {
        setConnectionState("CLOSED");
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      setIsReady(false);
      isConnecting.current = false;
      setConnectionState("CONNECTION_ERROR");
    };

    ws.current.onmessage = async (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        if (message.errorMessage === "TOKEN_EXPIRED") {
          console.log("Token expired, attempting to refresh...");
          const success = await handleTokenExpiration();
          if (!success) return;
          return;
        }

        // 핑 메시지에 대한 응답을 즉시 전송하여 연결 유지
        if (message.type === "PING") {
          ws.current?.send(JSON.stringify({ type: "PONG" }));
          return;
        }

        const channel = message.type;
        if (subscribers.current[channel]) {
          subscribers.current[channel].forEach((callback) =>
            callback(message.data)
          );
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
  }, [reconnect, handleTokenExpiration, processPendingMessages, resetConnectionTimeout]);

  // 네트워크 연결 상태 감지
  useEffect(() => {
    const handleOnline = () => {
      console.log("Network connection restored. Reconnecting WebSocket...");
      if (ws.current?.readyState !== WebSocket.OPEN) {
        reconnectAttempts.current = 0;
        connect();
      }
    };

    const handleOffline = () => {
      console.log("Network connection lost. WebSocket will reconnect when online.");
      setConnectionState("NETWORK_OFFLINE");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [connect]);

  useEffect(() => {
    connect();

    return () => {
      if (connectionTimeout.current) {
        clearTimeout(connectionTimeout.current);
      }
      if (ws.current) {
        ws.current.close(1000, "Component unmounted");
      }
      isConnecting.current = false;
    };
  }, [connect]);

  const cleanup = useCallback(() => {
    subscribers.current = {};
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const subscribe = useCallback(({ channel, callbackFn }: subscribeProps) => {
    if (!subscribers.current[channel]) {
      subscribers.current[channel] = new Set();
    }

    subscribers.current[channel]!.add(callbackFn);
    console.log(`⭕️ ${channel} 구독. Total subscribers:`, subscribers.current);
  }, []);

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

  const sendRequest = useCallback(
    (props: SendRequestProps) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current?.send(JSON.stringify(props));
      } else {
        // 연결이 안 된 상태면 메시지 큐에 저장
        console.log("WebSocket is not connected. Message queued for later delivery.");
        messageQueue.current.push(props);
        
        // 최대 100개까지만 보관
        if (messageQueue.current.length > 100) {
          messageQueue.current.shift();
        }
        
        // 연결 시도
        if (ws.current?.readyState === WebSocket.CLOSED || !ws.current) {
          connect();
        }
      }
    },
    [connect]
  );

  // 버퍼링된 하트비트 메시지 전송 (connected 상태일 때만)
  useHeartbeatInterval(
    () => {
      if (connectionState === "CONNECTED") {
        sendRequest({ type: "HEART_BEAT" });
      }
    },
    isReady ? 30000 : null
  );

  return (
    <WebSocketContext.Provider
      value={{
        isReady,
        connectionState,
        subscribe,
        unsubscribe,
        sendRequest,
        reconnect,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
