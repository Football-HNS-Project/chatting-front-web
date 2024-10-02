import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";

import { useGetMessages } from "@apis/Chat/useGetMessages";

import { changeDate } from "@utils/changeDate";
import { checkDisplayProfile } from "@utils/checkDisplayProfile";
import { groupMessagesByDate } from "@utils/groupMessagesByDate";

import { useScrollHandler } from "@hooks/useScrollHandler";
import { useWebSocketSubscription } from "@hooks/useWebSocketSubscription";

import { TChatMessageDetail } from "@typings/Chat";
import { CreateMessageEvent } from "@typings/WebsocketMessage.type";
import { CallbackProps } from "@typings/WebsocketProvider.type";

import { MyInfoAtom } from "@stores/UserStore";

import { MessageItem } from "./MessageItem";

export const ChatMessage: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<TChatMessageDetail[]>([]);
  const myInfo = useAtomValue(MyInfoAtom);

  const { data, fetchPreviousMessages } = useGetMessages({
    roomId: roomId ?? "",
    direction: "before",
    messageId: null,
  });

  const loadPreviousMessages = useCallback(async () => {
    if (data?.hasPreviousMessages && messages.length > 0) {
      prevScrollHeightRef.current = containerRef.current?.scrollHeight ?? 0;
      fetchPreviousMessages(messages[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.hasPreviousMessages, messages, fetchPreviousMessages]);

  const { containerRef, prevScrollHeightRef } = useScrollHandler({
    messages,
    loadPreviousMessages,
    hasPreviousMessages: data?.hasPreviousMessages,
  });

  useEffect(() => {
    if (data) {
      const allMessages = [
        ...(data.beforeMessages ?? []),
        ...(data.standardMessage ? [data.standardMessage] : []),
        ...(data.afterMessages ?? []),
      ];
      setMessages(allMessages);
    }
  }, [data]);

  const handleNewMessage = useCallback(
    (data: CallbackProps) => {
      const newMessage = data as CreateMessageEvent["data"];
      if (newMessage.roomId === roomId) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === newMessage.id)) {
            return prevMessages;
          }
          return [...prevMessages, newMessage];
        });
      }
    },
    [roomId]
  );

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
