import React from "react";

import { useAtomValue } from "jotai";

import { TChatMessage } from "@typings/WebsocketMessage";

import { UserAtom, User_Dummy } from "@stores/UserStore";

type ChatMessageProps = {
  chatting: TChatMessage[];
};

export const ChatMessage = ({ chatting }: ChatMessageProps) => {
  const user = useAtomValue(UserAtom);
  const messageEndRef = React.useRef<HTMLDivElement | null>(null);
  const changeDate = (date: Date) => {
    const createdAt = new Date(date);
    if (createdAt.getHours() < 12) {
      return `오전 ${createdAt.getHours()}:${createdAt.getMinutes()}`;
    }
    return `오후 ${createdAt.getHours() - 12}:${createdAt.getMinutes()}`;
  };

  const userMapping = (userId: number) => {
    const user = User_Dummy.filter((u) => u.id === userId);
    return user[0].name;
  };

  React.useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [chatting]);

  return (
    <div
      ref={messageEndRef}
      className="flex flex-col overflow-x-hidden overflow-y-auto p-[20px] gap-[10px]"
    >
      {chatting.map((chat) => (
        <div
          key={chat.id}
          className={`flex ${
            chat.sender === user.id
              ? "self-end flex-row-reverse"
              : "self-start flex-row"
          } `}
        >
          {chat.sender !== user.id && <div>{userMapping(chat.sender)}</div>}
          <div
            className={`${
              chat.sender === user.id ? "bg-green-300" : "bg-gray-200"
            } rounded-2xl max-w-[484px] p-[8px] text-[14px]`}
          >
            {chat.content}
          </div>
          <div className="self-end mx-3 text-[10px]">
            {changeDate(chat.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};
