import { NavigateFunction } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { QUERY_KEYS } from "@apis/QUERY_KEYS";
import { useLeaveRoom } from "@apis/Room/useLeaveRoom";

type CheckRoomLeaveModalProps = {
  roomId: string;
  closeModal: () => void;
  navigate: NavigateFunction;
};

export const CheckRoomLeaveModal = ({
  roomId,
  closeModal,
  navigate,
}: CheckRoomLeaveModalProps) => {
  const { mutate } = useLeaveRoom();
  const queryClient = useQueryClient();

  const handleLeaveRoom = () => {
    mutate(
      { roomId },
      {
        onSuccess: () => {
          closeModal();
          queryClient.refetchQueries({ queryKey: QUERY_KEYS.ROOM.list() });
          navigate("/room");
        },
      }
    );
  };

  return (
    <div className="flex h-fit w-[400px] transform flex-col items-center justify-between rounded-lg bg-white p-8 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">채팅방 나가기</h2>

      <div className="relative flex-auto p-6">
        <div className="flex flex-col items-center text-center">
          <TriangleAlert className="mb-4 h-16 w-16 text-red-500" />
          <p className="mb-2 text-lg text-gray-700">채팅방을 나가시겠습니까?</p>
          <p className="text-sm text-gray-500">
            모든 데이터가 삭제됩니다.
            <br />이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-300 p-6">
        <button
          className="mr-3 w-[100px] rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:outline-none"
          type="button"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className="w-[100px] rounded-md bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-red-600 focus:outline-none"
          type="button"
          onClick={handleLeaveRoom}
        >
          나가기
        </button>
      </div>
    </div>
  );
};
