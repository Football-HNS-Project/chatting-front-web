import { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Tab } from "@headlessui/react";
import { useAtom, useAtomValue } from "jotai";

import {
  GetRoomsRes,
  RoomChanged,
  TUser,
} from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { RoomListAtom } from "@stores/RoomListAtom";
import { UserAtom, User_Dummy } from "@stores/UserStore";

export const ChatRoomList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(UserAtom);
  const { id } = useParams<{ id: string }>();
  const { isReady, subscribe, unsubscribe, sendRequest } =
    useContext(WebSocketContext);
  const [roomList, setRoomList] = useAtom(RoomListAtom);
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const [tab, setTab] = useState(
    location.pathname.split("/")[2] === "room" ? 1 : 0
  );

  useEffect(() => {
    if (isReady) {
      sendRequest({
        type: "GET_ROOMS_REQUEST",
      });

      subscribe({
        channel: "GET_ROOMS_RESPONSE",
        callbackFn: (data) => {
          setRoomList((data as GetRoomsRes["data"]).rooms);
        },
      });
    }

    return () => {
      unsubscribe({ channel: "GET_ROOMS_RESPONSE" });
    };
  }, [isReady, sendRequest, setRoomList, subscribe, unsubscribe]);

  useEffect(() => {
    if (isReady) {
      subscribe({
        channel: `ROOM_CHANGED_${String(id)}`,
        callbackFn: (data) => {
          setRoomList((prev) => [(data as RoomChanged["data"]).room, ...prev]);
        },
      });
    }
  }, [id, isReady, setRoomList, subscribe]);

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
              <ul
                role="list"
                className="h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto"
              >
                {roomList?.map((room) => (
                  <li
                    key={room.id}
                    onClick={() => {
                      navigate(`room/${room.id}`);
                    }}
                  >
                    <a
                      className={`flex p-[16px] h-[72px] border-b-[1px] chatting-divider items-center overflow-hidden gap-[8px] cursor-pointer hover:bg-gray-100 duration-200 active:transition-colors active:bg-slate-200 ${
                        id === room.id ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <img
                        width={40}
                        height={40}
                        className="border-[1px] chatting-divider rounded-full"
                        src="/src/assets/Dummy_Icon.png"
                      />

                      <div className="w-0 flex-grow flex-shrink-0 basis-0">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-row items-center gap-[4px]">
                            <span className="max-w-[150px] h-[20px] text-[13px] font-bold overflow-x-hidden text-ellipsis whitespace-nowrap">
                              {room.name}
                            </span>
                            <span className="text-[12px] text-gray-500">
                              {room.memberSize}
                            </span>
                          </div>
                          <span className="text-[11px] whitespace-nowrap text-gray-500">
                            {`${new Date(
                              room.lastMessage.updatedAt
                            ).getFullYear()}-${String(
                              new Date(room.lastMessage.updatedAt).getMonth() +
                                1
                            ).padStart(2, "0")}-${String(
                              new Date(room.lastMessage.updatedAt).getDate()
                            ).padStart(2, "0")}`}
                          </span>
                        </div>
                        <div className="flex h-[20px] items-center">
                          <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] text-gray-700">
                            {room.lastMessage.content}
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
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
