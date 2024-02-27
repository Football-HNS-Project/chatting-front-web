import { Outlet } from "react-router-dom";

import { CreateRoomModal } from "@components/Modal/CreateRoomModal";

import { ChatRoomList } from "@pages/Chatting/Components/ChatRoomList";
import { UserList } from "@pages/Chatting/Components/UserList";

export const ChattingPage = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex relative h-full my-0 mx-auto bg-white">
        <div className="flex">
          <UserList />
          <ChatRoomList />
          <Outlet />
        </div>
        <CreateRoomModal />
      </div>
    </div>
  );
};
