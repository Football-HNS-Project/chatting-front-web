import { useParams } from "react-router-dom";

import LOGO from "@assets/chat-logo.png";

import { useGetRoomInfo } from "@apis/Room/useGetRoomInfo";

import { QueryWrapper } from "@components/QueryWrapper";

import { UsersInRoom } from "./UsersInRoom";

export const RoomInfo = () => {
  const { id } = useParams<{ id: string }>();
  const query = useGetRoomInfo({ roomId: id ?? "" });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <div className="chatting-divider flex min-h-[64px] items-center justify-between border-b-[1px] px-[20px]">
          <div className="flex w-full items-center gap-[12px]">
            <img width={40} src={LOGO} alt="logo" />
            <div className="flex w-full items-center justify-between pr-6">
              <div className="w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-[16px] font-semibold">{data.name}</span>
              </div>

              <UsersInRoom memberSize={data.memberSize} />
            </div>
          </div>
        </div>
      )}
    </QueryWrapper>
  );
};
