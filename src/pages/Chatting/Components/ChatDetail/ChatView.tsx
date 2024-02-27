import { useParams } from "react-router-dom";

import { ChatDetail } from "@pages/Chatting/Components/ChatDetail/ChatDetail";
import { NoChatView } from "@pages/Chatting/Components/ChatDetail/NoChatView";

export const ChatView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col min-w-[812px] max-w-[812px] border-r-[1px] chatting-divider">
      {id ? <ChatDetail /> : <NoChatView />}
    </section>
  );
};
