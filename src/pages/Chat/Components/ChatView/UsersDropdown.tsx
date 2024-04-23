import { useState } from "react";

import { useParams } from "react-router-dom";

import { useGetUsersInRoom } from "@apis/User/useGetUsersInRoom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

type UsersDropdownProps = {
  participantCount: number;
};

export const UsersDropdown = ({ participantCount }: UsersDropdownProps) => {
  const { id } = useParams();
  const [isOn, setIsOn] = useState(false);
  const { data } = useGetUsersInRoom({ roomId: String(id), isOn });

  console.log(data);
  return (
    <DropdownMenu
      onOpenChange={(res) => {
        setIsOn(res);
      }}
    >
      <DropdownMenuTrigger className="text-left outline-none">
        <span className="select-none text-[12px] text-gray-600">
          {participantCount}명
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="mb-3 text-2xl">구성원</div>
        <div className="flex flex-col">
          {data?.data.users.map((u) => <div key={u.id}>{u.name}</div>)}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
