import { useState } from "react";

import { CheckedSvg } from "@assets/CheckedSvg";
import { UnCheckedSvg } from "@assets/UnCheckedSvg";
import { HumanSvg } from "@assets/humanSvg";

import { Chatting_Dummy } from "@pages/Chatting/Chatting_Dummy";

export const ChattingPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedChattingId, setSelectedChattingId] = useState<number | null>(
    null
  );
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex relative w-[calc(120rem-20px)] h-full my-0 mx-auto bg-white">
        <div className="flex">
          {/* 채팅 목록 */}
          <nav className="flex flex-col w-[72px] py-[20px] px-[13px] border-l-[1px] border-r-[1px] chatting-divider bg-gray-200">
            <a className="border-[2px] rounded-full border-green-500 flex items-center justify-center">
              <HumanSvg size={40} />
            </a>
          </nav>
          <nav className="flex flex-col border-r-[1px] w-[312px] min-w-[312px]">
            <div className="flex h-[64px] min-h-[64px] items-center px-[20px] border-b-[1px] chatting-divider">
              <span className="font-bold text-[16px]">닉네임</span>
            </div>
            <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] chatting-divider">
              <label className="flex p-[6px] text-[13px] text-gray-500 cursor-pointer gap-[4px] tracking-tight rounded-md select-none hover:bg-gray-200 duration-[0.6s] active:bg-gray-300 active:duration-0 active:transition-colors">
                <span>안읽은 메시지만 보기</span>
                <input
                  type="checkbox"
                  hidden
                  onClick={() => setIsChecked(!isChecked)}
                />
                {isChecked ? <UnCheckedSvg /> : <CheckedSvg />}
              </label>
            </div>
            <ul
              role="list"
              className="h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto"
            >
              {Chatting_Dummy.map((chatting) => (
                <li
                  key={chatting.id}
                  onClick={() => {
                    setSelectedChattingId(chatting.id);
                  }}
                >
                  <a
                    className={`flex p-[16px] h-[72px] border-b-[1px] chatting-divider items-center overflow-hidden gap-[8px] cursor-pointer hover:bg-gray-100 duration-200 active:transition-colors active:bg-slate-200 ${
                      selectedChattingId === chatting.id
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                  >
                    <img
                      width={40}
                      height={40}
                      className="border-[1px] chatting-divider rounded-full"
                      src="/src/assets/Dummy_Icon.png"
                    />

                    <div className="w-0 flex-grow flex-shrink-0 basis-0">
                      <div className="flex flex-row items-center gap-[6px]">
                        <span className="h-[20px] text-[13px] font-bold overflow-x-hidden text-ellipsis whitespace-nowrap">
                          {chatting.sender}
                        </span>
                        <span className="text-[12px] whitespace-nowrap text-gray-500">
                          {chatting.sendDate}
                        </span>
                      </div>
                      <div className="flex h-[20px] items-center">
                        <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] text-gray-700">
                          {chatting.message}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* 채팅 상세 */}
          <nav></nav>
        </div>

        <div className="flex"></div>
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
};
