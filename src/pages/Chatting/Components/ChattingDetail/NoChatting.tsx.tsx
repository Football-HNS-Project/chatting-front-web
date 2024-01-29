import React, { useContext } from "react";

import { NoChatSvg } from "@assets/NoChatSvg";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

export const NoChatting = () => {
  const [userId, setUserId] = React.useState<string>("");
  const { createRoom } = useContext(WebSocketContext);

  const handleCreateChat = () => {
    createRoom("1", userId);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-[34px]">
      <NoChatSvg />
      <span className="text-[14px] text-gray-700">
        채팅할 상대를 선택해주세요.
      </span>
      <div>
        <input
          className="border-[1px] h-full mr-3 p-2"
          placeholder="userId를 입력하세요"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <button
          type="button"
          className="border-[1px] border-gray-400 px-6 py-4"
          onClick={handleCreateChat}
        >
          채팅하기
        </button>
      </div>
    </div>
  );
};
