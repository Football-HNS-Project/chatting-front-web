import { ChattingList } from "@pages/Chatting/Components/ChattingList";

export const ChattingPage = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex relative w-[calc(120rem-20px)] h-full my-0 mx-auto bg-white">
        <div className="flex">
          {/* 채팅 목록 */}
          <ChattingList />
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
