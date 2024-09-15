import { MessageForm } from "@pages/Chat/Components/ChatView/MessageForm";

import { ChatMessage } from "./ChatMessage";
import { RoomInfo } from "./RoomInfo";

export const ChatView = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-shrink grow basis-0 flex-col overflow-hidden">
        {/* 상단부 */}
        <RoomInfo />
        {/* 채팅 내용 */}
        <ChatMessage />
      </div>
      <MessageForm />
    </div>
  );
};
