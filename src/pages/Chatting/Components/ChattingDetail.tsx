import { ChattingDropdown } from "@pages/Chatting/Components/ChattingDropdown";

export const ChattingDetail = () => {
  return (
    <section className="flex flex-col min-w-[812px] max-w-[812px] border-r-[1px] chatting-divider">
      <div className="flex flex-shrink grow basis-0 flex-col overflow-hidden">
        <div className="flex justify-between items-center min-h-[64px] border-b-[1px] chatting-divider px-[20px]">
          <div className="flex items-center gap-[12px]">
            <img
              width={40}
              height={40}
              src="/src/assets/Dummy_Icon.png"
              className="border-[1px] chatting-divider rounded-full"
            />
            <span className="text-[15px]">닉네임</span>
          </div>
          <ChattingDropdown />
        </div>
      </div>
    </section>
  );
};
