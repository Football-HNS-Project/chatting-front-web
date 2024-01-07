import { HumanSvg } from "@components/Gnb/humanSvg";

export const ChattingPage = () => {
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
            <div className="flex h-[64px] min-h-[64px] border-b-[1px] border-gray-300">
              닉네임
            </div>
            <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] border-gray-300">
              안읽은 메시지만 보기
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
