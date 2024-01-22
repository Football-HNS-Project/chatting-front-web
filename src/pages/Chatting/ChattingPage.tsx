import { Outlet } from "react-router-dom";

import { ChattingList } from "@pages/Chatting/Components/ChattingList";

export const ChattingPage = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex relative h-full my-0 mx-auto bg-white">
        <div className="flex">
          <ChattingList />
          <Outlet />
        </div>
        <div className="flex"></div>
      </div>
    </div>
  );
};
