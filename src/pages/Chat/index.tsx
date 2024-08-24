import { useParams } from "react-router-dom";

import { ChatDetail } from "@pages/Chat/Components/ChatView/ChatDetail";
import { NoChatView } from "@pages/Chat/Components/ChatView/NoChatView";

export const ChatPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="chatting-divider flex h-full min-w-[812px] flex-col border-r-[1px]">
      {id ? <ChatDetail /> : <NoChatView />}
    </section>
  );
};
