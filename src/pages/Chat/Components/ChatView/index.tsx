// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { makeSection } from "@utils/makeSection";
// import {
//   GetRoomInfoRes,
//   MessageCreated,
//   ReceiveMessagesInRoomRes,
//   TChatMessageDetail,
// } from "@typings/WebsocketMessage.type";
// import { WebSocketContext } from "@components/Websocket/WebsocketProvider";
// import { ChatMessage } from "@pages/Chat/Components/ChatView/ChatMessage";
import { MessageForm } from "@pages/Chat/Components/ChatView/MessageForm";

// import { UsersDropdown } from "@pages/Chat/Components/ChatView/UsersInRoom";
import { RoomInfo } from "./RoomInfo";

export const ChatView = () => {
  // const { id } = useParams<{ id: string }>();
  // const [messages, setMessages] = useState<TChatMessageDetail[]>([]);
  // const [roomInfo, setRoomInfo] = useState<GetRoomInfoRes["data"]["room"]>(
  //   {} as GetRoomInfoRes["data"]["room"]
  // );
  // const { isReady, subscribe, sendRequest, unsubscribe } =
  //   useContext(WebSocketContext);

  // useEffect(() => {
  //   if (isReady) {
  //     sendRequest({
  //       type: "OPEN_ROOM_REQUEST",
  //       data: {
  //         roomId: String(id),
  //       },
  //     });
  //     sendRequest({
  //       type: "GET_ROOM_INFO_REQUEST",
  //       data: {
  //         roomId: String(id),
  //       },
  //     });
  //     sendRequest({
  //       type: "RECEIVE_MESSAGES_IN_ROOM",
  //       data: { roomId: String(id), messageId: null },
  //     });

  //     subscribe({
  //       channel: "GET_ROOM_INFO_RESPONSE",
  //       callbackFn: (data) => {
  //         setRoomInfo((data as GetRoomInfoRes["data"]).room);
  //       },
  //     });
  //     subscribe({
  //       channel: "RECEIVE_MESSAGES_IN_ROOM_RESPONSE",
  //       callbackFn: (data) => {
  //         setMessages((data as ReceiveMessagesInRoomRes["data"]).messages);
  //       },
  //     });
  //     subscribe({
  //       channel: `MESSAGE_CREATED_${String(id)}`,
  //       callbackFn: (data) => {
  //         setMessages((prev) => [
  //           (data as MessageCreated["data"]).message,
  //           ...prev,
  //         ]);
  //       },
  //     });
  //   }

  //   return () => {
  //     unsubscribe({
  //       channel: "GET_ROOM_INFO_RESPONSE",
  //     });
  //     unsubscribe({
  //       channel: `MESSAGE_CREATED_${String(id)}`,
  //     });
  //   };
  // }, [id, isReady, sendRequest, subscribe, unsubscribe]);

  // const chatSections = makeSection([...messages].reverse() ?? []);

  return (
    <div className="flex h-full w-full flex-col">
      {/* 상단부 */}
      <div className="flex flex-shrink grow basis-0 flex-col overflow-hidden">
        <RoomInfo />
        {/* 채팅 내용 */}
        {/* <ChatMessage messages={chatSections} /> */}
      </div>
      <MessageForm />
    </div>
  );
};
