import { useContext, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtomValue, useSetAtom } from "jotai";

import { CreateRoomRes } from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { TabAtom } from "@stores/TabStore";
import { UserAtom, User_Dummy } from "@stores/UserStore";

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAtomValue(UserAtom);
  const userInfo = User_Dummy.filter((v) => v.id === Number(id))[0];
  const { isReady, sendRequest, subscribe, unsubscribe } =
    useContext(WebSocketContext);
  const navigate = useNavigate();
  const setTab = useSetAtom(TabAtom);

  const handleCreateChat = () => {
    if (isReady) {
      sendRequest({
        type: "CREATE_ROOM_REQUEST",
        data: {
          name: userInfo.name,
          participants: [user.id, userInfo.id],
        },
      });
      subscribe({
        channel: "CREATE_ROOM_RESPONSE",
        callbackFn: (data) => {
          setTab("room");
          navigate(`/chatting/room/${(data as CreateRoomRes["data"]).roomId}`);
        },
      });
    }
  };
  useEffect(() => {
    return () => {
      unsubscribe({ channel: "CREATE_ROOM_RESPONSE" });
    };
  }, [unsubscribe]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
      <span className="text-[21px] font-bold">{userInfo.name}</span>
      <button
        className="text-[24px] border-[1px] p-5 hover:bg-slate-100"
        onClick={handleCreateChat}
      >
        1:1 채팅하기
      </button>
    </div>
  );
};
