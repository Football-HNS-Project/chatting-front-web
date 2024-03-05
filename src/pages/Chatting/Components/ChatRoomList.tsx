import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtom, useAtomValue } from "jotai";

import { CheckedSvg } from "@assets/CheckedSvg";
import { UnCheckedSvg } from "@assets/UnCheckedSvg";

import { TRoom } from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { RoomListAtom } from "@stores/RoomListAtom";
import { UserAtom } from "@stores/UserStore";

export const ChatRoomList = () => {
  const navigate = useNavigate();
  const user = useAtomValue(UserAtom);
  const { id } = useParams<{ id: string }>();
  const { isReady, subscribe, unsubscribe, sendRequest } =
    useContext(WebSocketContext);

  const [isChecked, setIsChecked] = useState(false);
  const [roomList, setRoomList] = useAtom(RoomListAtom);

  useEffect(() => {
    if (isReady) {
      sendRequest({
        type: "GET_ROOMS_REQUEST",
      });

      subscribe({
        type: "system",
        channel: "GET_ROOMS_RESPONSE",
        callbackFn: (data) => {
          setRoomList(data as TRoom[]);
        },
      });
    }

    return () => {
      unsubscribe({ type: "system", channel: "GET_ROOMS_RESPONSE" });
    };
  }, [isReady, sendRequest, setRoomList, subscribe, unsubscribe]);

  return (
    <nav className="flex flex-col border-r-[1px] w-[312px] min-w-[312px]">
      <div className="flex h-[64px] min-h-[64px] items-center px-[20px] border-b-[1px] chatting-divider">
        <span className="font-bold text-[16px]">{user.name}</span>
      </div>
      <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] chatting-divider">
        <label className="flex p-[6px] text-[13px] text-gray-500 cursor-pointer gap-[4px] tracking-tight rounded-md select-none hover:bg-gray-200 duration-[0.6s] active:bg-gray-300 active:duration-0 active:transition-colors">
          <span>안읽은 메시지만 보기</span>
          <input
            type="checkbox"
            hidden
            onClick={() => setIsChecked(!isChecked)}
          />
          {isChecked ? <UnCheckedSvg /> : <CheckedSvg />}
        </label>
      </div>
      <ul
        role="list"
        className="h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto"
      >
        {roomList.map((room) => (
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
                    {`${new Date(room.updatedAt).getFullYear()}-${String(
                      new Date(room.updatedAt).getMonth() + 1
                    ).padStart(2, "0")}-${String(
                      new Date(room.updatedAt).getDate()
                    ).padStart(2, "0")}`}
                  </span>
                </div>
                <div className="flex h-[20px] items-center">
                  <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-[13px] text-gray-700">
                    {room.message}
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
