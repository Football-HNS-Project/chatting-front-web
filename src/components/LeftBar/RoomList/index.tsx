import React, { useCallback, useContext, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtom } from "jotai";

import { useGetRooms } from "@apis/Room/useGetRooms";

import { TRoom } from "@typings/Room";
import { CreateRoomEvent } from "@typings/WebsocketMessage.type";
import { CallbackProps } from "@typings/WebsocketProvider.type";

import { Spinner } from "@components/Spinner";
import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { RoomListAtom } from "@stores/RoomStore";

import { EmptyRoomList } from "./EmptyRoomList";
import { RoomItem } from "./RoomItem";

export const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [roomList, setRoomList] = useAtom(RoomListAtom);
  const { data, isLoading, error } = useGetRooms();
  const { isReady, subscribe, unsubscribe } = useContext(WebSocketContext);

  const handleRoomClick = (roomId: string) => {
    navigate(`room/${roomId}`);
  };

  useEffect(() => {
    if (data) {
      setRoomList(data);
    }
  }, [data, setRoomList]);

  const handleRoomCreate = useCallback(
    (data: CallbackProps) => {
      const room = data as CreateRoomEvent["data"];
      setRoomList((prevRooms) => {
        if (prevRooms.some((prevRoom) => prevRoom.id === room.id)) {
          return prevRooms;
        }
        const newRoom: TRoom = {
          id: room.id,
          name: room.name,
          memberIds: room.memberIds,
          createdAt: room.createdAt,
          unread: 0,
        };
        return [newRoom, ...prevRooms];
      });
    },
    [setRoomList]
  );

  useEffect(() => {
    if (isReady) {
      subscribe({
        channel: "ROOM_CREATED",
        callbackFn: handleRoomCreate,
      });
    }

    return () => {
      if (isReady) {
        unsubscribe({ channel: "ROOM_CREATED" });
      }
    };
  }, [isReady, subscribe, unsubscribe, handleRoomCreate]);

  if (isLoading) return <Spinner />;
  if (error) throw error;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="flex h-full w-full items-center justify-center">
      {roomList.length === 0 ? (
        <EmptyRoomList />
      ) : (
        <ul className="absolute flex h-full w-full flex-col space-y-2 overflow-auto p-2">
          {roomList.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              isActive={room.id === id}
              onRoomClick={handleRoomClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
