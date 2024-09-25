import React, { useCallback, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtom } from "jotai";

import { useGetRooms } from "@apis/Room/useGetRooms";

import { useWebSocketSubscription } from "@hooks/useWebSocketSubscription";

import { TRoom } from "@typings/Room";
import {
  CreateMessageEvent,
  CreateRoomEvent,
  UpdateRoomEvent,
} from "@typings/WebsocketMessage.type";
import { CallbackProps } from "@typings/WebsocketProvider.type";

import { Spinner } from "@components/Spinner";

import { RoomListAtom } from "@stores/RoomStore";

import { EmptyRoomList } from "./EmptyRoomList";
import { RoomItem } from "./RoomItem";

export const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams<{ id?: string }>();
  const [roomList, setRoomList] = useAtom(RoomListAtom);
  const { data, isLoading, error } = useGetRooms();
  const lastMessageRef = useRef<{ [roomId: string]: string }>({});

  const handleRoomClick = (roomId: string) => {
    navigate(`room/${roomId}`);
    setRoomList((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, unread: 0 } : room
      )
    );
  };

  useEffect(() => {
    if (data) {
      setRoomList(data);
      data.forEach((room) => {
        if (room.latestMessage) {
          lastMessageRef.current[room.id] = room.latestMessage.id;
        }
      });
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

  const handleNewMessage = useCallback(
    (data: CallbackProps) => {
      console.log({ data });
      const message = data as CreateMessageEvent["data"];
      setRoomList((prevRooms) => {
        const updatedRooms = prevRooms.map((room) => {
          if (room.id === message.roomId) {
            if (lastMessageRef.current[room.id] === message.id) {
              return room;
            }
            lastMessageRef.current[room.id] = message.id;

            return {
              ...room,
              latestMessage: {
                id: message.id,
                plainText: message.plainText,
                createdAt: message.createdAt,
              },
              unread: roomId === message.roomId ? 0 : (room.unread ?? 0) + 1,
            } as TRoom;
          }
          return room;
        });

        const updatedRoomIndex = updatedRooms.findIndex(
          (room) => room.id === message.roomId
        );
        if (updatedRoomIndex > 0) {
          const [updatedRoom] = updatedRooms.splice(updatedRoomIndex, 1);
          return [updatedRoom, ...updatedRooms];
        }

        return updatedRooms;
      });
    },
    [roomId, setRoomList]
  );

  const handleRoomChange = useCallback(
    (data: CallbackProps) => {
      const changedRoom = data as UpdateRoomEvent["data"];
      setRoomList((prevRooms) =>
        prevRooms.map((room) =>
          room.id === changedRoom.id
            ? { ...room, memberIds: changedRoom.memberIds }
            : room
        )
      );
    },
    [setRoomList]
  );

  useWebSocketSubscription("MESSAGE_CREATED", handleNewMessage);
  useWebSocketSubscription("ROOM_CREATED", handleRoomCreate);
  useWebSocketSubscription("ROOM_CHANGED", handleRoomChange);

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
              isActive={room.id === roomId}
              onRoomClick={handleRoomClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
