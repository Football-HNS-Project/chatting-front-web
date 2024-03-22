import { useParams } from "react-router-dom";

import { NoChatView } from "@pages/Chatting/Components/ChatDetail/NoChatView";
import { UserDetail } from "@pages/Chatting/Components/User/UserDetail";

export const UserView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col min-w-[812px] max-w-[812px] border-r-[1px] chatting-divider">
      {id ? <UserDetail /> : <NoChatView />}
    </section>
  );
};
