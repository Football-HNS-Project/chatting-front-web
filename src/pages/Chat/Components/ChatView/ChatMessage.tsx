import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useAtom } from "jotai";

import { useGetMessages } from "@apis/Chat/useGetMessages";

import { TChatMessageDetail } from "@typings/Chat";
import { TUser } from "@typings/User";

import { MyInfoAtom } from "@stores/UserStore";

const checkDisplayProfile = (
  messages: TChatMessageDetail[],
  currentMessage: TChatMessageDetail,
  index: number,
  currentUser: TUser | null
) => {
  if (currentMessage.sender.id === currentUser?.id) return false;
  if (index === 0) return true;
  const prevMessage = messages[index - 1];
  return prevMessage.sender.id !== currentMessage.sender.id;
};

export const ChatMessage = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<TChatMessageDetail[]>([]);
  const { data } = useGetMessages({
    roomId: id ?? "",
    direction: "desc",
    messageId: null,
  });
  const [user] = useAtom(MyInfoAtom);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      const allMessages = [
        ...data.beforeMessages,
        data.standardMessage,
        ...data.afterMessages,
      ];
      setMessages(allMessages);
    }
  }, [data]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const groupMessagesByDate = (messages: TChatMessageDetail[]) => {
    return messages.reduce(
      (acc, message) => {
        const date = dayjs(message.createdAt).format("YYYY년 M월 d일");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      },
      {} as Record<string, TChatMessageDetail[]>
    );
  };

  const groupedMessages = groupMessagesByDate(messages);
  console.log(groupedMessages);
  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden px-[20px] pt-[20px]"
    >
      {Object.entries(groupedMessages).map(([date, dayMessages]) => (
        <div key={date} className="flex flex-col gap-[10px]">
          <div className="self-center rounded-xl bg-slate-200 px-4 py-1 text-sm">
            {date}
          </div>
          {dayMessages.map((message, index) => {
            const displayProfile = checkDisplayProfile(
              dayMessages,
              message,
              index,
              user
            );
            const isCurrentUser = message.sender.id === user?.id;
            const isSystemMessage = message.senderType === "SYSTEM";
            const timeValue = dayjs(message.createdAt).format("HH:mm");

            if (isSystemMessage) {
              return (
                <div key={message.id} className="flex justify-center">
                  <span className="rounded-3xl bg-slate-200 px-6 py-1 text-[14px]">
                    {message.plainText}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser
                    ? "flex-row-reverse self-end"
                    : "flex-row self-start"
                } mt-1`}
              >
                <div className="flex">
                  {displayProfile && !isCurrentUser ? (
                    <div className="h-[40px] w-[40px] rounded-3xl bg-slate-400" />
                  ) : !isCurrentUser ? (
                    <div className="w-[40px]" />
                  ) : null}
                  <div className="ml-[5px]">
                    {displayProfile && !isCurrentUser && (
                      <p className="mb-[5px] text-xl">{message.sender.name}</p>
                    )}
                    <div
                      className={`${
                        isCurrentUser ? "bg-green-300" : "bg-gray-200"
                      } max-w-[484px] rounded-2xl p-[8px] text-[14px]`}
                    >
                      {message.plainText.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mx-2 self-end text-[10px]">{timeValue}</div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};
