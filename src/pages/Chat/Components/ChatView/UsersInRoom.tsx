import { useState } from "react";

import { useParams } from "react-router-dom";

import { useAtomValue } from "jotai";
import { UserPlus, Users } from "lucide-react";

import { useGetUsersInRoom } from "@apis/User/useGetUsersInRoom";

import { useModal } from "@components/Modal/useModal";
import { QueryWrapper } from "@components/QueryWrapper";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui";

import { MyInfoAtom } from "@stores/UserStore";

import { InviteUserModal } from "./InviteUserModal";

type UsersInRoomProps = {
  memberSize: number;
};

export const UsersInRoom = ({ memberSize }: UsersInRoomProps) => {
  const { id } = useParams<{ id: string }>();
  const [isOn, setIsOn] = useState(false);
  const query = useGetUsersInRoom({ roomId: id ?? "", isOn });
  const myInfo = useAtomValue(MyInfoAtom);
  const { showCustomModal, closeCustomModal } = useModal();

  const handleAddUser = () => {
    showCustomModal({
      displayComponent: (
        <InviteUserModal closeModal={closeCustomModal} roomId={id ?? ""} />
      ),
      isBackDrop: true,
    });
  };

  if (!myInfo) return null;

  return (
    <Popover
      onOpenChange={() => {
        setIsOn(true);
      }}
    >
      <PopoverTrigger asChild>
        <button className="flex flex-shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none">
          <Users size={18} />
          <span className="select-none">{memberSize}명</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="mr-7 w-[250px] overflow-hidden rounded-md p-0 shadow-lg">
        <p className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
          채팅방 참여자
        </p>
        <QueryWrapper query={query}>
          {(data) => (
            <div className="h-60 max-h-60 overflow-y-auto">
              {data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                >
                  <p className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-500">
                    {user.name.charAt(0).toUpperCase()}
                  </p>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    {user.name}
                    {myInfo.id === user.id && (
                      <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-gray-200">
                        <p className="text-[10px]">나</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </QueryWrapper>
        <button
          className="flex w-full items-center justify-center gap-2 border-t px-4 py-2 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
          onClick={handleAddUser}
        >
          <UserPlus size={16} />
          대화상대 추가하기
        </button>
      </PopoverContent>
    </Popover>
  );
};
