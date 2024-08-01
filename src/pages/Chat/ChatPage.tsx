import { Outlet } from "react-router-dom";

import { CreateRoomModal } from "@components/Modal/CreateRoomModal";

import { LeftBar } from "@pages/Chat/Components/LeftBar";

export const ChatPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col justify-center overflow-hidden bg-gray-100">
      <div className="relative mx-auto my-0 flex h-full bg-white">
        <div className="flex">
          <LeftBar />
          <Outlet />
        </div>
        <CreateRoomModal />
      </div>
    </div>
  );
};
