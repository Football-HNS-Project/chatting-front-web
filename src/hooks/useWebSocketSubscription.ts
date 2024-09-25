import { useCallback, useContext, useEffect, useRef } from "react";

import { CallbackProps, TSocketMessage } from "@typings/WebsocketProvider.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

export const useWebSocketSubscription = (
  channel: TSocketMessage["type"],
  callback: (data: CallbackProps) => void
) => {
  const { isReady, subscribe, unsubscribe } = useContext(WebSocketContext);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const wrappedCallback = useCallback((data: CallbackProps) => {
    callbackRef.current(data);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    subscribe({ channel, callbackFn: wrappedCallback });

    return () => {
      unsubscribe({ channel, callbackFn: wrappedCallback });
    };
  }, [isReady, channel, subscribe, unsubscribe, wrappedCallback]);
};
