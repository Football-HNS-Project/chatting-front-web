import { useParams } from "react-router-dom";

import { ChatDetail } from "@pages/Chatting/Components/ChatDetail/ChatDetail";
import { NoChatView } from "@pages/Chatting/Components/ChatDetail/NoChatView";

export const ChatView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="chatting-divider flex min-w-[812px] max-w-[812px] flex-col border-r-[1px]">
      {id ? <ChatDetail /> : <NoChatView />}
    </section>
  );
};
