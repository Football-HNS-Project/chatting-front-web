import { useCallback, useContext, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import CHAT_LOGO from "@assets/chat-logo.png";

import { CreateMessageEvent } from "@typings/WebsocketMessage.type";
import { CallbackProps, TSocketMessage } from "@typings/WebsocketProvider.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

const activeNotifications = new Map<
  string,
  { notification: Notification; timer: number }
>();

export const useWebSocketSubscription = (
  channel: TSocketMessage["type"],
  callback: (data: CallbackProps) => void
) => {
  const { id: currentRoomId } = useParams<{ id: string }>();
  const { isReady, subscribe, unsubscribe } = useContext(WebSocketContext);
  const callbackRef = useRef(callback);

  const showNotification = useCallback(
    (data: CreateMessageEvent["data"]) => {
      if (data.notificationInfo?.roomId === currentRoomId) {
        return;
      }

      const notificationId = `${data.notificationInfo?.roomId}-${Date.now()}`;

      // 새 알림 생성
      const notification = new Notification(data.notificationInfo?.senderName, {
        body: data.notificationInfo?.plainText,
        icon: CHAT_LOGO,
        tag: notificationId,
      });

      // 3초 후 자동으로 알림 닫기
      const timer = window.setTimeout(() => {
        notification.close();
        activeNotifications.delete(notificationId);
      }, 3000);

      // Map에 알림 저장
      activeNotifications.set(notificationId, { notification, timer });

      // 알림 클릭 처리
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        window.location.href = `/room/${data.notificationInfo?.roomId}`;
        notification.close();
        clearTimeout(timer);
        activeNotifications.delete(notificationId);
      };
    },
    [currentRoomId]
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const wrappedCallback = useCallback(
    (data: CallbackProps) => {
      if (
        channel === "MESSAGE_CREATED" &&
        document.visibilityState === "visible"
      ) {
        showNotification(data as CreateMessageEvent["data"]);
      }

      callbackRef.current(data);
    },
    [channel, showNotification]
  );

  useEffect(() => {
    if (!isReady) return;
    subscribe({ channel, callbackFn: wrappedCallback });

    return () => {
      // 컴포넌트 언마운트 시 모든 알림 정리
      activeNotifications.forEach(({ notification, timer }) => {
        notification.close();
        clearTimeout(timer);
      });
      activeNotifications.clear();
      unsubscribe({ channel, callbackFn: wrappedCallback });
    };
  }, [isReady, channel, subscribe, unsubscribe, wrappedCallback]);
};
