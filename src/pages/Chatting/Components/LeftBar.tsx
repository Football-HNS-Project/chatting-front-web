import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Tab } from "@headlessui/react";
import { useAtomValue } from "jotai";

import { TUser } from "@typings/WebsocketMessage.type";

import { RoomList } from "@pages/Chatting/Components/RoomList";

import { UserAtom, User_Dummy } from "@stores/UserStore";

export const LeftBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(UserAtom);
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const [tab, setTab] = useState(
    location.pathname.split("/")[2] === "room" ? 1 : 0
  );

  return (
    <nav className="flex flex-col border-r-[1px] w-[312px] min-w-[312px]">
      <div className="flex h-[64px] min-h-[64px] items-center px-[20px] border-b-[1px] chatting-divider">
        <span className="font-bold text-[16px]">{user.name}</span>
      </div>
      <div className="flex flex-col w-full">
        <Tab.Group selectedIndex={tab} onChange={setTab}>
          <Tab.List className="">
            {["구성원", "채팅방"].map((v) => (
              <Tab key={v} className="w-1/2">
                {({ selected }) => (
                  <div
                    className={`w-full h-full p-5 text-[12px] ${
                      selected
                        ? "bg-white font-bold border-b-[2px] border-slate-400"
                        : "bg-white border-b-[1px]"
                    }`}
                  >
                    {v}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ul
                role="list"
                className="h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto"
              >
                {User_Dummy.map((v) => (
                  <li
                    key={v.id}
                    className={`flex cursor-pointer hover:bg-slate-200 w-full h-[68px] p-[16px] items-center ${
                      v.id === selectedUser.id ? "bg-slate-300" : "bg-white"
                    }`}
                    onClick={() => {
                      navigate(`user/${v.id}`);
                      setSelectedUser(v);
                    }}
                  >
                    {v.name}
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel className="overflow-scroll h-[760px]">
              <RoomList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] chatting-divider">
        <label className="flex p-[6px] text-[13px] text-gray-500 cursor-pointer gap-[4px] tracking-tight rounded-md select-none hover:bg-gray-200 duration-[0.6s] active:bg-gray-300 active:duration-0 active:transition-colors">
          <span>안읽은 메시지만 보기</span>
          <input
            type="checkbox"
            hidden
            onClick={() => setIsChecked(!isChecked)}
          />
          {isChecked ? <UnCheckedSvg /> : <CheckedSvg />}
        </label>
      </div> */}
    </nav>
  );
};
