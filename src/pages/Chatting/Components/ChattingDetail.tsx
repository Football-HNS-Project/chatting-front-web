import { useAtomValue } from "jotai";

import { NoChatSvg } from "@assets/NoChatSvg";

import { Chatting_Dummy } from "@pages/Chatting/Chatting_Dummy";
import { ChattingDropdown } from "@pages/Chatting/Components/ChattingDropdown";
import { ChattingForm } from "@pages/Chatting/Components/ChattingForm";
import { ChattingMessage } from "@pages/Chatting/Components/ChattingMessage";

import { ChattingAtom } from "@stores/ChattingStore";

export const ChattingDetail = () => {
  const selectedChattingId = useAtomValue(ChattingAtom);

  return (
    <section className="flex flex-col min-w-[812px] max-w-[812px] border-r-[1px] chatting-divider">
      {selectedChattingId ? (
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
                  {
                    Chatting_Dummy.filter((v) => v.id === selectedChattingId)[0]
                      .senderInfo.name
                  }
                </span>
              </div>
              <ChattingDropdown />
            </div>
            {/* 채팅 내용 */}
            <ChattingMessage
              chatting={
                Chatting_Dummy.filter((v) => v.id === selectedChattingId)[0]
                  .message
              }
            />
          </div>
          <ChattingForm />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full gap-[34px]">
          <NoChatSvg />
          <span className="text-[14px] text-gray-700">
            채팅할 상대를 선택해주세요.
          </span>
        </div>
      )}
    </section>
  );
};
