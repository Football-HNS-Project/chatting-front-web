import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  GetRoomInfoRes,
  TChatMessageDetail,
} from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { ChatMessage } from "@pages/Chatting/Components/ChatDetail/ChatMessage";
import { Dropdown } from "@pages/Chatting/Components/ChatDetail/Dropdown";
import { MessageForm } from "@pages/Chatting/Components/ChatDetail/MessageForm";

export const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [messages] = useState<TChatMessageDetail[]>([]);
  const [roomInfo, setRoomInfo] = useState<GetRoomInfoRes["data"]["room"]>(
    {} as GetRoomInfoRes["data"]["room"]
  );
  const { isReady, subscribe, sendRequest, unsubscribe } =
    useContext(WebSocketContext);

  useEffect(() => {
    if (isReady) {
      sendRequest({
        type: "OPEN_ROOM_REQUEST",
        data: {
          roomId: String(id),
        },
      });
      sendRequest({
        type: "GET_ROOM_INFO_REQUEST",
        data: {
          roomId: String(id),
        },
      });
      sendRequest({
        type: "RECEIVE_MESSAGE_IN_ROOM_REQUEST",
        data: { roomId: String(id), messageId: "" },
      });

      subscribe({
        channel: "GET_ROOM_INFO_RESPONSE",
        callbackFn: (data) => {
          setRoomInfo((data as GetRoomInfoRes["data"]).room);
        },
      });
    }

    return () => {
      unsubscribe({
        channel: "GET_ROOM_INFO_RESPONSE",
      });
    };
  }, [id, isReady, sendRequest, subscribe, unsubscribe]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* 상단부 */}
      <div className="flex flex-shrink grow basis-0 flex-col overflow-hidden">
        <div className="flex justify-between items-center min-h-[64px] border-b-[1px] chatting-divider px-[20px]">
          <div className="flex items-center gap-[12px]">
            <img
              width={40}
              height={40}
              src="/src/assets/Dummy_Icon.png"
              className="border-[1px] chatting-divider rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-[16px]">{roomInfo.name}</span>
              <span className="text-[12px] text-gray-600">
                {roomInfo.participantCount}명
              </span>
            </div>
          </div>
          <Dropdown />
        </div>
        {/* 채팅 내용 */}
        <ChatMessage messages={messages} />
      </div>
      <MessageForm />
    </div>
  );
};
