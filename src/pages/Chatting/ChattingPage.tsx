import { useState } from "react";

import { CheckedSvg } from "@assets/CheckedSvg";
import { UnCheckedSvg } from "@assets/UnCheckedSvg";
import { HumanSvg } from "@assets/humanSvg";

export const ChattingPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex relative w-[calc(120rem-20px)] h-full my-0 mx-auto bg-white">
        <div className="flex">
          {/* 채팅 목록 */}
          <nav className="flex flex-col w-[72px] py-[20px] px-[13px] border-l-[1px] border-r-[1px] border-gray-300 bg-gray-200">
            <a className="border-[2px] rounded-full border-orange-500 flex items-center justify-center">
              <HumanSvg size={40} />
            </a>
          </nav>
          <nav className="flex flex-col border-r-[1px] w-[312px] min-w-[312px]">
            <div className="flex h-[64px] min-h-[64px] items-center px-[20px] border-b-[1px] border-gray-300">
              <span className="font-bold text-[16px]">닉네임</span>
            </div>
            <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] border-gray-300">
              <label className="flex p-[6px] text-[13px] text-gray-500 cursor-pointer gap-[4px] tracking-tight rounded-md select-none hover:bg-gray-200 duration-[0.6s] active:bg-gray-300 active:duration-0 active:transition-colors">
                <span>안읽은 메시지만 보기</span>
                <input
                  type="checkbox"
                  hidden
                  onClick={() => setChecked(!checked)}
                />
                {checked ? <CheckedSvg /> : <UnCheckedSvg />}
              </label>
            </div>
            <ul
              role="list"
              className="h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto"
            >
              <li>gd</li>
              <li>gd</li>
              <li>gd</li>
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
