import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useAtom } from "jotai";

import { useGetRooms } from "@apis/Room/useGetRooms";

import { RoomChanged } from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { RoomPopover } from "@pages/Chat/Components/RoomPopover";

import { RoomListAtom } from "@stores/RoomStore";

export const RoomList = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isReady, subscribe } = useContext(WebSocketContext);
  const [roomList, setRoomList] = useAtom(RoomListAtom);
  const [isVisibleMenu, setIsVisibleMenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetRooms();

  useEffect(() => {
    if (data) {
      setRoomList(data.data.rooms);
    }
  }, [data, setRoomList]);

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <ul role="list" className="flex h-full w-full flex-col overflow-auto">
      {roomList?.map((room) => (
        <li
          key={room.id}
          onClick={() => {
            navigate(`room/${room.id}`);
          }}
          onMouseOver={() => {
            setHoveredMenu(room.id);
          }}
          onMouseOut={() => {
            setHoveredMenu(null);
          }}
          className={`${
            room.id === String(id) ? "bg-slate-200" : "bg-white"
          } relative flex h-[72px] cursor-pointer items-center gap-4 rounded-xl p-[16px] hover:bg-slate-100`}
        >
          <img
            width={40}
            height={40}
            className="chatting-divider rounded-full border-[1px]"
            src="/src/assets/Dummy_Icon.png"
          />
          <div
            className={`${
              hoveredMenu === room.id || isVisibleMenu === room.id
                ? "w-[17rem]"
                : "w-[22rem]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-[4px]">
                <span className="h-[20px] max-w-[150px] overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] font-bold">
                  {room.name}
                </span>
                <span className="text-[12px] text-gray-500">
                  {room.memberSize}
                </span>
              </div>
              {room.id !== hoveredMenu && room.id !== isVisibleMenu && (
                <span className="whitespace-nowrap text-[11px] text-gray-500">
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

          {(hoveredMenu === room.id || isVisibleMenu === room.id) && (
            <RoomPopover setIsVisibleMenu={setIsVisibleMenu} roomId={room.id} />
          )}
        </li>
      ))}
    </ul>
  );
};
