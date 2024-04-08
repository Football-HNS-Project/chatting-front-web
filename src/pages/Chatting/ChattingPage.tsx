import { Outlet } from "react-router-dom";

import { CreateRoomModal } from "@components/Modal/CreateRoomModal";

import { LeftBar } from "@pages/Chatting/Components/LeftBar";

export const ChattingPage = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
      <div className="flex relative h-full my-0 mx-auto bg-white">
        <div className="flex">
          <LeftBar />
          <Outlet />
        </div>
        <CreateRoomModal />
      </div>
    </div>
  );
};
