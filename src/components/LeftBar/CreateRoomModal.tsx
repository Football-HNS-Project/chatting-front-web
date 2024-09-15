import React, { useState } from "react";

import { NavigateFunction } from "react-router-dom";

import { useAtomValue } from "jotai";
import { Search, User } from "lucide-react";

import { useCreateRoom } from "@apis/Room/useCreateRoom";
import { useGetUsers } from "@apis/User/useGetUsers";

import { TUser } from "@typings/User";

import { QueryWrapper } from "@components/QueryWrapper";

import { MyInfoAtom } from "@stores/UserStore";

type CreateRoomModalProps = {
  closeModal: () => void;
  navigate: NavigateFunction;
};

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  closeModal,
  navigate,
}) => {
  const query = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState<Omit<TUser, "email">[]>(
    []
  );
  const myInfo = useAtomValue(MyInfoAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomName, setRoomName] = useState("");
  const { mutate } = useCreateRoom();

  const handleUserToggle = (user: Omit<TUser, "email">) => {
    setSelectedUsers((prev) =>
      prev.map((v) => v.id).includes(user.id)
        ? prev.filter((v) => v.id !== user.id)
        : [...prev, user]
    );
  };

  const handleCreate = () => {
    const finalRoomName =
      roomName.trim() ||
      [myInfo?.name, ...selectedUsers.map((v) => v.name)].join(", ");
    mutate(
      {
        name: finalRoomName,
        memberIds: selectedUsers.map((v) => v.id),
        roomType: selectedUsers.length === 1 ? "DIRECT" : "GROUP",
      },
      {
        onSuccess: (res) => {
          closeModal();
          navigate(`/room/${res.roomId}`);
        },
      }
    );
  };

  if (!myInfo) return null;

  return (
    <div className="flex h-[600px] w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="mb-4 text-xl font-bold text-gray-800">채팅방 생성</h2>

      {/* 채팅방 이름 입력 필드 */}
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="채팅방 이름 입력 (선택사항)"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-700"
        />
      </div>

      <div className="mb-2 self-start text-sm text-gray-500">
        초대할 사용자 {selectedUsers.length}명 선택됨
      </div>
      <div className="relative mb-4 w-full">
        <input
          type="text"
          placeholder="사용자 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-gray-700"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      <QueryWrapper query={query}>
        {(data) => (
          <div className="w-full flex-grow overflow-y-auto">
            <div className="overflow-y-auto pr-2">
              {data
                .filter((v) => v.id !== myInfo.id)
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 rounded-md p-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={selectedUsers.map((v) => v.id).includes(user.id)}
                      onChange={() => handleUserToggle(user)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="flex flex-grow cursor-pointer items-center"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                        <User size={20} />
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}
      </QueryWrapper>
      <div className="mt-4 flex w-full justify-end space-x-2">
        <button
          onClick={closeModal}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          취소
        </button>
        <button
          onClick={handleCreate}
          disabled={selectedUsers.length === 0}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300"
        >
          생성하기
        </button>
      </div>
    </div>
  );
};
