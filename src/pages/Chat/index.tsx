import { useParams } from "react-router-dom";

import { ChatView } from "./Components/ChatView";
import { NoChatView } from "./Components/NoChatView";
import { UserInfo } from "./Components/UserInfo";

export const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const currenPath = location.pathname.split("/")[1] as "user" | "room";

  if (currenPath === "user") {
    return (
      <section className="flex h-full min-w-[812px] flex-col">
        <UserInfo userId={id ?? ""} />
      </section>
    );
  } else {
    return (
      <section className="flex h-full min-w-[812px] flex-col">
        {id ? <ChatView /> : <NoChatView />}
      </section>
    );
  }
};
