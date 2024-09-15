import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";

import { useGetMessages } from "@apis/Chat/useGetMessages";

import { changeDate } from "@utils/changeDate";
import { checkDisplayProfile } from "@utils/checkDisplayProfile";
import { groupMessagesByDate } from "@utils/groupMessagesByDate";

import { useWebSocketSubscription } from "@hooks/useWebSocketSubscription";

import { TChatMessageDetail } from "@typings/Chat";
import { CreateMessageEvent } from "@typings/WebsocketMessage.type";
import { CallbackProps } from "@typings/WebsocketProvider.type";

import { MyInfoAtom } from "@stores/UserStore";

import { MessageItem } from "./MessageItem";

export const ChatMessage: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<TChatMessageDetail[]>([]);
  const { data } = useGetMessages({
    roomId: roomId ?? "",
    direction: "desc",
    messageId: null,
  });
  const myInfo = useAtomValue(MyInfoAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const standardMessageRef = useRef<HTMLDivElement>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  /**
   * 메세지 데이터 로드 및 초기 스크롤 위치 설정
   */
  useEffect(() => {
    if (data) {
      const allMessages = [
        ...(data.beforeMessages.length > 0 ? data.beforeMessages : []),
        ...(data.standardMessage !== null ? [data.standardMessage] : []),
        ...(data.afterMessages.length > 0 ? data.afterMessages : []),
      ];
      setMessages(allMessages);
      if (allMessages.length > 0) {
        lastMessageIdRef.current = allMessages[allMessages.length - 1].id;
      }

      // 메시지가 로드된 후 스크롤 위치 조정
      setTimeout(() => {
        if (standardMessageRef.current && containerRef.current) {
          containerRef.current.scrollTop =
            standardMessageRef.current.offsetTop -
            containerRef.current.offsetHeight / 2;
        }
      }, 0);
    }
  }, [data]);

  /**
   * 새 메세지 처리 함수
   */
  const handleNewMessage = useCallback(
    (data: CallbackProps) => {
      const newMessage = data as CreateMessageEvent["data"];
      if (
        newMessage.roomId === roomId &&
        newMessage.id !== lastMessageIdRef.current
      ) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === newMessage.id)) {
            return prevMessages;
          }
          lastMessageIdRef.current = newMessage.id;
          return [...prevMessages, newMessage];
        });
      }
    },
    [roomId]
  );

  /**
   * 스크롤 이벤트 핸들러
   */
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 1;
      setShouldScrollToBottom(isAtBottom);
    }
  }, []);

  /**
   * 스크롤 이벤트 리스너 등록
   */
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  /**
   * 새 메세지 도착 시 스크롤 조정
   */
  useEffect(() => {
    if (shouldScrollToBottom && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, shouldScrollToBottom]);

  /**
   * websocket 구독 설정
   */
  useWebSocketSubscription("MESSAGE_CREATED", handleNewMessage);

  // 메시지 그룹화 (메모이제이션 적용)
  const groupedMessages = useMemo(() => {
    const dateGroups = groupMessagesByDate(messages);
    return Object.entries(dateGroups).map(([date, dayMessages]) => {
      const messageGroups = dayMessages.reduce((groups, message, index) => {
        const prevMessage = dayMessages[index - 1];
        if (
          !prevMessage ||
          prevMessage.sender.id !== message.sender.id ||
          dayjs(message.createdAt).format("HH:mm") !==
            dayjs(prevMessage.createdAt).format("HH:mm")
        ) {
          groups.push([]);
        }
        groups[groups.length - 1].push(message);
        return groups;
      }, [] as TChatMessageDetail[][]);

      return { date, messageGroups };
    });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden px-[20px] pt-[20px]"
    >
      {groupedMessages.map(({ date, messageGroups }) => (
        <div key={date} className="flex flex-col gap-[10px]">
          <div className="self-center rounded-xl bg-slate-200 px-4 py-1 text-sm">
            {date}
          </div>
          {messageGroups.map((group) =>
            group.map((message, messageIndex) => {
              const isLastInGroup = messageIndex === group.length - 1;
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  isCurrentUser={message.sender.id === myInfo?.id}
                  displayProfile={checkDisplayProfile(
                    group,
                    message,
                    messageIndex,
                    myInfo
                  )}
                  isStandardMessage={message.id === data?.standardMessage?.id}
                  timeValue={changeDate(dayjs(message.createdAt))}
                  standardMessageRef={standardMessageRef}
                  showTime={isLastInGroup}
                />
              );
            })
          )}
        </div>
      ))}
    </div>
  );
};
