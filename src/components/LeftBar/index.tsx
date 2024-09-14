import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAtom, useAtomValue } from "jotai";
import { PlusCircle } from "lucide-react";

import { RoomList } from "@components/LeftBar/RoomList";
import { useModal } from "@components/Modal/useModal";
import { Input } from "@components/ui";

import { TAB_MENU, TabAtom } from "@stores/TabStore";
import { MyInfoAtom } from "@stores/UserStore";

import { CreateRoomModal } from "./CreateRoomModal";
import { UserList } from "./UserList";

export const LeftBar = () => {
  const [tab, setTab] = useAtom(TabAtom);
  const myInfo = useAtomValue(MyInfoAtom);
  const navigate = useNavigate();
  const { showCustomModal, closeCustomModal } = useModal();
  const currenPath = location.pathname.split("/")[1] as "user" | "room";

  useEffect(() => {
    setTab(currenPath);
  }, [currenPath, setTab]);

  if (!myInfo) return;

  return (
    <nav className="flex w-[350px] min-w-[350px] flex-col overflow-hidden border-r border-gray-200 bg-white shadow-lg">
      {/* 유저 정보 */}
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
        <span className="text-lg font-bold text-gray-800">{myInfo.name}</span>
        <div className="h-10 w-10 rounded-full bg-gray-200">
          {/* User avatar placeholder */}
        </div>
      </div>

      {/* 검색 및 채팅방 추가 */}
      <div className="flex items-center space-x-2 p-4">
        <Input className="flex-grow" placeholder="채팅방 검색..." />
        <button
          className="text-gray-600 transition-colors duration-200 hover:text-blue-500 focus:outline-none"
          onClick={() => {
            showCustomModal({
              displayComponent: (
                <CreateRoomModal
                  closeModal={closeCustomModal}
                  navigate={navigate}
                />
              ),
              isBackDrop: true,
            });
          }}
        >
          <PlusCircle size={24} />
        </button>
      </div>

      {/* 탭 */}
      <div className="flex h-12 flex-shrink-0 border-b border-gray-200">
        {TAB_MENU.map((t) => (
          <button
            key={t.path}
            className={`flex flex-1 items-center justify-center text-sm font-medium transition-colors duration-200 ${
              tab === t.path
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setTab(t.path)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 패널 */}
      <div className="relative h-full overflow-hidden">
        {tab === "user" ? <UserList myInfo={myInfo} /> : <RoomList />}
      </div>
    </nav>
  );
};
