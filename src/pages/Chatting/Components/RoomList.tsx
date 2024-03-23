import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

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
          onMouseOver={() => {
            setIsVisibleMenu(room.id);
          }}
          onMouseOut={() => {
            setIsVisibleMenu(null);
          }}
        >
          <div className="flex relative p-[16px] h-[72px] border-b-[1px] chatting-divider items-center overflow-hidden gap-[8px] cursor-pointer hover:bg-gray-100">
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
                {room.id !== isVisibleMenu && (
                  <span className="text-[11px] whitespace-nowrap text-gray-500">
                    {`${new Date(
                      room.lastMessage.updatedAt
                    ).getFullYear()}-${String(
                      new Date(room.lastMessage.updatedAt).getMonth() + 1
                    ).padStart(2, "0")}-${String(
                      new Date(room.lastMessage.updatedAt).getDate()
                    ).padStart(2, "0")}`}
                  </span>
                )}
              </div>
              <div className="flex h-[20px] w-80 items-center">
                <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] text-gray-700">
                  {room.lastMessage.content}
                </span>
              </div>
            </div>
            {room.id === isVisibleMenu && (
              <div className="hover:bg-slate-300 rounded-full">
                <svg
                  viewBox="0 0 21 21"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <g fill="currentColor" fillRule="evenodd">
                    <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
                    <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
                    <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
                  </g>
                </svg>
                ``
              </div>
            )}
            {/* <div
                className="absolute right-0 z-[70px] hover:bg-slate-300"
                onClick={(e) => {
                  console.log("WEF");
                  e.stopPropagation();
                }}
              >
               
              </div> */}
            {/* <Popover>
              {room.id === isVisibleMenu && (
                <Popover.Button className="hover:bg-slate-300">
                  <svg
                    viewBox="0 0 21 21"
                    fill="currentColor"
                    height="3em"
                    width="3em"
                  >
                    <g fill="currentColor" fillRule="evenodd">
                      <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
                      <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
                      <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
                    </g>
                  </svg>
                </Popover.Button>
              )}

              <Popover.Panel static className="absolute z-50">
                <div className="w-32 h-32 bg-slate-200"></div>
              </Popover.Panel>
            </Popover> */}
          </div>
        </li>
      ))}
    </ul>
  );
};
