import { Dropdown } from "@pages/Chatting/Components/ChatDetail/Dropdown";
import { MessageForm } from "@pages/Chatting/Components/ChatDetail/MessageForm";

export const YesChatting = () => {
  // const { id } = useParams();

  return (
    <div className="flex flex-col w-full h-full">
      {/* 상단부 */}
      <div className="flex flex-shrink grow basis-0 flex-col overflow-hidden">
        <div className="flex justify-between items-center min-h-[64px] border-b-[1px] chatting-divider px-[20px]">
          <div className="flex items-center gap-[12px]">
            <img
              width={40}
              height={40}
              src="/src/assets/Dummy_Icon.png"
              className="border-[1px] chatting-divider rounded-full"
            />
            <span className="text-[15px]">
              {/* TODO: API 끼우기 */}
              {/* {
                Chatting_Dummy.filter((v) => v.id === Number(id))[0].senderInfo
                  .name
              } */}
            </span>
          </div>
          <Dropdown />
        </div>
        {/* 채팅 내용 */}
        {/* <ChattingMessage
          chatting={
            Chatting_Dummy.filter((v) => v.id === Number(id))[0].message
          }
        /> */}
      </div>
      <MessageForm />
    </div>
  );
};
