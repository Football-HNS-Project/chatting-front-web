import { NoChatSvg } from "@assets/NoChatSvg";

export const NoChatView = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-[34px]">
      <NoChatSvg />
      <span className="text-[14px] text-gray-700">
        채팅할 상대를 선택해주세요.
      </span>
    </div>
  );
};
