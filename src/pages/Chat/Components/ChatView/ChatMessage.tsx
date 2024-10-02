import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";

import { useGetMessages } from "@apis/Chat/useGetMessages";

import { changeDate } from "@utils/changeDate";
import { checkDisplayProfile } from "@utils/checkDisplayProfile";
import { groupMessagesByDate } from "@utils/groupMessagesByDate";

import { useScrollHandler } from "@hooks/useScrollHandler";
import { useWebSocketSubscription } from "@hooks/useWebSocketSubscription";

// New import
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
  const lastMessageIdRef = useRef<string | null>(null);
  const {
    containerRef,
    standardMessageRef,
    loadMoreRef,
    inView,
    shouldScrollToBottom,
    scrollToStandardMessage,
    scrollToBottom,
  } = useScrollHandler();

  useEffect(() => {
    if (inView && data?.hasPreviousMessages) {
      console.log("FFFFFFF");
    }
  }, [inView, data?.hasPreviousMessages]);

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

      scrollToStandardMessage();
    }
  }, [data, scrollToStandardMessage]);

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

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [messages, shouldScrollToBottom, scrollToBottom]);

  useWebSocketSubscription("MESSAGE_CREATED", handleNewMessage);

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
      <h1 ref={loadMoreRef}>Load More</h1>
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
