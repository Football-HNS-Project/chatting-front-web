import { useParams } from "react-router-dom";

import { NoChatting } from "@pages/Chatting/Components/ChattingDetail/NoChatting.tsx";
import { YesChatting } from "@pages/Chatting/Components/ChattingDetail/YesChatting";

export const ChattingDetail = () => {
  const { id } = useParams();

  return (
    <section className="flex flex-col min-w-[812px] max-w-[812px] border-r-[1px] chatting-divider">
      {id ? <YesChatting /> : <NoChatting />}
    </section>
  );
};
