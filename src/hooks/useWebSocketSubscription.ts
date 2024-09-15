import { useCallback, useContext, useEffect } from "react";

import { CallbackProps, TSocketMessage } from "@typings/WebsocketProvider.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

export const useWebSocketSubscription = (
  channel: TSocketMessage["type"],
  callback: (data: CallbackProps) => void
) => {
  const { isReady, subscribe, unsubscribe } = useContext(WebSocketContext);

  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (isReady) {
      console.log(`Subscribing to ${channel}`);
      subscribe({
        channel,
        callbackFn: memoizedCallback,
      });
    }

    return () => {
      if (isReady) {
        console.log(`Unsubscribing from ${channel}`);
        unsubscribe({ channel });
      }
    };
  }, [isReady, channel, subscribe, unsubscribe, memoizedCallback]);
};
