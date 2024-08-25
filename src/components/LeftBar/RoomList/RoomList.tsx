import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAtom } from "jotai";

import { useGetRooms } from "@apis/Room/useGetRooms";

import { Spinner } from "@components/Spinner";

import { RoomListAtom } from "@stores/RoomStore";

import { EmptyRoomList } from "./EmptyRoomList";
import { RoomItem } from "./RoomItem";

export const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [roomList, setRoomList] = useAtom(RoomListAtom);

  const { data, isLoading, error } = useGetRooms();

  const handleRoomClick = (roomId: string) => {
    navigate(`room/${roomId}`);
  };

  useEffect(() => {
    if (data) {
      setRoomList(data);
    }
  }, [data, setRoomList]);

  if (isLoading) return <Spinner />;
  if (error) throw error;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <ul className="flex h-full w-full flex-col space-y-2 overflow-auto p-2">
      {roomList.length === 0 ? (
        <EmptyRoomList />
      ) : (
        roomList.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            isActive={room.id === id}
            onRoomClick={handleRoomClick}
          />
        ))
      )}
    </ul>
  );
};

// useEffect(() => {
//   if (isReady) {
//     subscribe({
//       channel: `ROOM_CHANGED_${String(id)}`,
//       callbackFn: (data) => {
//         const roomIds = roomList.map((v) => v.id);
//         // roomList에 이미 id가 있으면 -> 이미 있는 채팅방 -> 맨 위로 옮기기
//         if (roomIds.includes((data as RoomChanged["data"]).room.id)) {
//           const newRoomList = [...roomList];
//           const foundRoomIdx = roomIds.findIndex(
//             (v) => v === (data as RoomChanged["data"]).room.id
//           );
//           newRoomList.splice(foundRoomIdx, 1);
//           newRoomList.unshift((data as RoomChanged["data"]).room);
//           setRoomList(newRoomList);
//         }
//         // roomList에 id가 없음 -> 새로운 채팅방임 -> 맨 위로 생성
//         else {
//           setRoomList((prev) => [
//             (data as RoomChanged["data"]).room,
//             ...prev,
//           ]);
//         }
//       },
//     });
//   }
// }, [id, isReady, roomList, setRoomList, subscribe]);
