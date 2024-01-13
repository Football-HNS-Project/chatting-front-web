import { useAtomValue } from "jotai";

import { UserAtom } from "@stores/UserStore";

type ChatttingMessageProps = {
  chatting: { id: number; userId: number; message: string }[];
};
export const ChattingMessage = ({ chatting }: ChatttingMessageProps) => {
  const user = useAtomValue(UserAtom);
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto p-[20px] gap-[10px]">
      {chatting.map((chat) => (
        <div
          className={`${
            chat.userId === user.id
              ? "bg-green-300 self-end"
              : "bg-gray-200 self-start"
          } max-w-[484px] p-[8px] rounded-2xl text-[14px]`}
        >
          {chat.message}
        </div>
      ))}
    </div>
  );
};
