import { useParams } from "react-router-dom";

import { NoChatView } from "@pages/Chatting/Components/ChatDetail/NoChatView";
import { UserDetail } from "@pages/Chatting/Components/User/UserDetail";

export const UserView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="chatting-divider flex min-w-[812px] max-w-[812px] flex-col border-r-[1px]">
      {id ? <UserDetail /> : <NoChatView />}
    </section>
  );
};
