import { useParams } from "react-router-dom";

import { NoChatView } from "@pages/Chat/Components/ChatView/NoChatView";

import { UserDetail } from "./UserDetail";

export const UserViewPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="chatting-divider flex min-w-[812px] max-w-[812px] flex-col border-r-[1px]">
      {id ? <UserDetail /> : <NoChatView />}
    </section>
  );
};
