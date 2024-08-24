import { useAtom } from "jotai";
import { PlusCircle } from "lucide-react";

import { useGetMyInfo } from "@apis/User/useGetMyInfo";

import { QueryWrapper } from "@components/QueryWrapper";
import { Input } from "@components/ui";

import { RoomList } from "@pages/Chat/Components/RoomList";

import { TAB_MENU, TabAtom } from "@stores/TabStore";

import { UserList } from "./UserList";

export const LeftBar = () => {
  const [tab, setTab] = useAtom(TabAtom);
  const query = useGetMyInfo();

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <nav className="flex w-[312px] min-w-[312px] flex-col border-r border-gray-200 bg-white shadow-lg">
          {/* 유저 정보 */}
          <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
            <span className="text-lg font-bold text-gray-800">{data.name}</span>
            <div className="h-10 w-10 rounded-full bg-gray-200">
              {/* User avatar placeholder */}
            </div>
          </div>

          {/* 검색 및 채팅방 추가 */}
          <div className="flex items-center space-x-2 p-4">
            <Input className="flex-grow" placeholder="채팅방 검색..." />
            <button className="text-gray-600 transition-colors duration-200 hover:text-blue-500 focus:outline-none">
              <PlusCircle size={24} />
            </button>
          </div>

          {/* 탭 */}
          <div className="flex h-12 border-b border-gray-200">
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
          <div className="flex-1 overflow-y-auto">
            {tab === "user" ? <UserList /> : <RoomList />}
          </div>
        </nav>
      )}
    </QueryWrapper>
  );
};
