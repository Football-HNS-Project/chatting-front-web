import { Fragment, useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { useAtom } from "jotai";

import { GetRoomsRes, RoomChanged } from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { RoomListAtom } from "@stores/RoomListAtom";

export const RoomList = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isReady, subscribe, unsubscribe, sendRequest } =
    useContext(WebSocketContext);
  const [roomList, setRoomList] = useAtom(RoomListAtom);
  const [isVisibleMenu, setIsVisibleMenu] = useState<string | null>(null);

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
          const roomIds = roomList.map((v) => v.id);
          // roomList에 이미 id가 있으면 -> 이미 있는 채팅방 -> 맨 위로 옮기기
          if (roomIds.includes((data as RoomChanged["data"]).room.id)) {
            const newRoomList = [...roomList];
            const foundRoomIdx = roomIds.findIndex(
              (v) => v === (data as RoomChanged["data"]).room.id
            );
            newRoomList.splice(foundRoomIdx, 1);
            newRoomList.unshift((data as RoomChanged["data"]).room);
            setRoomList(newRoomList);
          }
          // roomList에 id가 없음 -> 새로운 채팅방임 -> 맨 위로 생성
          else {
            setRoomList((prev) => [
              (data as RoomChanged["data"]).room,
              ...prev,
            ]);
          }
        },
      });
    }
  }, [id, isReady, roomList, setRoomList, subscribe]);

  return (
    <ul role="list" className="flex flex-col w-full h-full overflow-auto">
      {roomList?.map((room) => (
        <li
          key={room.id}
          onClick={() => {
            navigate(`room/${room.id}`);
          }}
          onMouseOver={() => {
            setIsVisibleMenu(room.id);
          }}
          onMouseOut={() => {
            setIsVisibleMenu(null);
          }}
          className={`${
            room.id === String(id) ? "bg-slate-200" : "bg-white"
          } hover:bg-slate-100 flex p-[16px] h-[72px] items-center rounded-xl gap-4 cursor-pointer relative`}
        >
          <img
            width={40}
            height={40}
            className="border-[1px] chatting-divider rounded-full"
            src="/src/assets/Dummy_Icon.png"
          />
          <div
            className={`${
              isVisibleMenu === room.id ? "w-[19rem]" : "w-[22rem]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-[4px]">
                <span className="max-w-[150px] h-[20px] text-[13px] font-bold overflow-x-hidden text-ellipsis whitespace-nowrap">
                  {room.name}
                </span>
                <span className="text-[12px] text-gray-500">
                  {room.memberSize}
                </span>
              </div>
              {room.id !== isVisibleMenu && (
                <span className="text-[11px] whitespace-nowrap text-gray-500">
                  {dayjs()
                    .startOf("day")
                    .isSame(dayjs(room.lastMessage.updatedAt).startOf("day"))
                    ? dayjs(room.lastMessage.updatedAt).hour() < 12
                      ? `오전 ${dayjs(room.lastMessage.updatedAt).format(
                          "h:mm"
                        )}`
                      : `오후 ${dayjs(room.lastMessage.updatedAt).format(
                          "h:mm"
                        )}`
                    : `${dayjs(room.lastMessage.updatedAt).format(
                        "YYYY-MM-DD"
                      )}`}
                </span>
              )}
            </div>
            <div className="flex h-[20px] w-full items-center">
              <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] text-gray-700">
                {room.lastMessage.content}
              </span>
            </div>
          </div>
          <Popover>
            <Popover.Button
              className={`${
                isVisibleMenu !== room.id ? "hidden" : "flex"
              } hover:bg-slate-300 p-3 rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed z-50 w-32 bg-white">
                <div>초대하기</div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </li>
      ))}
    </ul>
  );
};
