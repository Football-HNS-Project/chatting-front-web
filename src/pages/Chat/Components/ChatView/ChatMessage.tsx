import React from "react";

import { useAtomValue } from "jotai";

import { checkDisplayProfile } from "@utils/checkDisplayProfile";
import { checkDisplayTime } from "@utils/checkDisplayTime";
import { userMapping } from "@utils/userMapping";

import { TChatMessageDetail } from "@typings/WebsocketMessage.type";

import { UserAtom } from "@stores/UserStore";

type ChatMessageProps = {
  messages: { [key: string]: TChatMessageDetail[] };
};

export const ChatMessage = ({ messages }: ChatMessageProps) => {
  const user = useAtomValue(UserAtom);
  const messageEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageEndRef}
      className="overflow-y-auto overflow-x-hidden p-[20px]"
    >
      {Object.entries(messages).map(([date, chats]) => {
        return (
          <div key={date} className="flex flex-col gap-[10px]">
            <div className="self-center rounded-xl bg-slate-200 px-9 py-1 text-lg">
              {date}
            </div>
            {chats.map((chat, index) => {
              const [displayTime, timeValue] = checkDisplayTime(
                chats,
                chat,
                index
              );
              const displayProfile = checkDisplayProfile(
                chats,
                chat,
                index,
                user
              );
              return (
                <div key={chat.id}>
                  {chat?.sender === -1 ? (
                    <div className="flex justify-center">
                      <span className="rounded-3xl bg-slate-200 px-5 py-3">
                        {chat.content}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        chat?.sender === user.id
                          ? "flex-row-reverse self-end"
                          : "flex-row self-start"
                      } `}
                    >
                      <div className="flex">
                        {displayProfile ? (
                          <div className="h-[40px] w-[40px] rounded-3xl bg-slate-400" />
                        ) : chat?.sender !== user.id ? (
                          <div className="w-[40px]" />
                        ) : null}
                        <div className="ml-[5px]">
                          {displayProfile && (
                            <p className="mb-[5px] text-xl">
                              {userMapping(chat?.sender)}
                            </p>
                          )}
                          <div
                            className={`${
                              chat?.sender === user.id
                                ? "bg-green-300"
                                : "bg-gray-200"
                            } max-w-[484px] rounded-2xl p-[8px] text-[14px]`}
                          >
                            {chat.content.split("\n").map((line) => (
                              <span key={line}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {displayTime ? (
                        <div className="mx-2 self-end text-[10px]">
                          {timeValue}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
