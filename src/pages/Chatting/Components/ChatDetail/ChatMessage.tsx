import React from "react";

import { useAtomValue } from "jotai";

import { TChatMessageDetail } from "@typings/WebsocketMessage.type";

import { UserAtom, User_Dummy } from "@stores/UserStore";

type ChatMessageProps = {
  messages: TChatMessageDetail[];
};

export const ChatMessage = ({ messages }: ChatMessageProps) => {
  const user = useAtomValue(UserAtom);
  const messageEndRef = React.useRef<HTMLDivElement | null>(null);
  const changeDate = (date: Date) => {
    const createdAt = new Date(date);
    if (createdAt.getHours() < 12) {
      return `오전 ${createdAt.getHours()}:${String(
        createdAt.getMinutes()
      ).padStart(2, "0")}`;
    }
    return `오후 ${createdAt.getHours() - 12}:${String(
      createdAt.getMinutes()
    ).padStart(2, "0")}`;
  };

  const userMapping = (userId: number) => {
    const user = User_Dummy.filter((u) => u.id === userId);
    return user[0].name;
  };

  React.useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageEndRef}
      className="flex flex-col overflow-x-hidden overflow-y-auto p-[20px] gap-[10px]"
    >
      {messages.map((chat, index) => {
        const isCreated = new Date(chat.createdAt);
        let displayTime = true;
        const timeValue = changeDate(chat.createdAt);
        if (index !== messages.length - 1) {
          const nextSender = messages[index + 1].sender;
          if (nextSender === chat.sender) {
            const nextTimeValue = changeDate(messages[index + 1].createdAt);
            if (timeValue === nextTimeValue) {
              displayTime = false;
            }
          }
        }

        let displayProfile = false;

        if (index !== 0) {
          const prevSender = messages[index - 1].sender;
          const prevCreatedDate = new Date(messages[index - 1].createdAt);
          prevCreatedDate.setHours(prevCreatedDate.getHours() - 9);
          if (
            prevSender !== chat.sender ||
            prevCreatedDate.getDate() !== isCreated.getDate()
          ) {
            displayProfile = true;
          }
        } else {
          displayProfile = true;
        }
        if (chat.sender === user.id) {
          displayProfile = false;
        }

        return (
          <div key={chat.id}>
            {chat.sender === -1 ? (
              <div className="flex self-end">{chat.content}</div>
            ) : (
              <div
                className={`flex ${
                  chat.sender === user.id
                    ? "self-end flex-row-reverse"
                    : "self-start flex-row"
                } `}
              >
                <div className="flex">
                  {/* 프로필 */}
                  {displayProfile ? (
                    <div className="w-[40px] h-[40px] bg-slate-400 rounded-3xl" />
                  ) : chat.sender !== user.id ? (
                    <div className="w-[40px]" />
                  ) : null}
                  <div className="ml-[5px]">
                    {/* 이름 */}
                    {displayProfile && (
                      <p className="mb-[5px] text-xl">
                        {userMapping(chat.sender)}
                      </p>
                    )}
                    {/* 내용 */}
                    <div
                      className={`${
                        chat.sender === user.id ? "bg-green-300" : "bg-gray-200"
                      } rounded-2xl max-w-[484px] p-[8px] text-[14px]`}
                    >
                      {chat.content}
                    </div>
                  </div>
                </div>
                {/* 시간 */}
                {displayTime ? (
                  <div className="self-end mx-2 text-[10px]">{timeValue}</div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
