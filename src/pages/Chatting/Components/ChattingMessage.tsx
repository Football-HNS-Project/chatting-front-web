import { useAtomValue } from "jotai";

import { TChatMessage } from "@typings/WebsocketMessage";

import { UserAtom } from "@stores/UserStore";

type ChatttingMessageProps = {
  chatting: TChatMessage[];
};

export const ChattingMessage = ({ chatting }: ChatttingMessageProps) => {
  const user = useAtomValue(UserAtom);

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto p-[20px] gap-[10px]">
      {chatting.map((chat) => (
        <div
          key={chat.id}
          className={`${
            chat.sender === user.id
              ? "bg-green-300 self-end"
              : "bg-gray-200 self-start"
          } max-w-[484px] p-[8px] rounded-2xl text-[14px]`}
        >
          {chat.content}
        </div>
      ))}
    </div>
  );
};
