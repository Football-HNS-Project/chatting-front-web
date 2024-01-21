/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useRef, useState } from "react";

type TMessage = {
  type: string;
  room?: string;
  text?: string;
  rooms?: string[];
};
type WebSocketContextProps = {
  rooms: string[];
  messages: TMessage[];
  sendMessage: (room: string, msg: string) => void;
};
export const WebSocketContext = createContext<WebSocketContextProps>({
  rooms: [],
  messages: [],
  sendMessage: () => {},
});

type WebsocketProviderProps = {
  children: React.ReactNode;
};
export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://...");

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "rooms") {
        // room list를 받았을 때
        setRooms(message.rooms);
      } else if (message.type === "message") {
        // 메시지를 받았을 때
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (room: string, message: string) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({ type: "message", room, text: message })
      );
    }
  };

  return (
    <WebSocketContext.Provider value={{ rooms, messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
