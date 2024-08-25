import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TUser } from "@typings/User";

type GetUsersInRoomReq = {
  roomId: string;
  isOn: boolean;
};

type GetUsersInRoomRes = Omit<TUser, "email">[];

const getUsersInRoom = async (params: GetUsersInRoomReq) => {
  const { roomId } = params;
  return await instance.get<GetUsersInRoomReq, GetUsersInRoomRes>(
    `/rooms/${roomId}/members`
  );
};

export const useGetUsersInRoom = (params: GetUsersInRoomReq) => {
  return useQuery<GetUsersInRoomRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.roomMemberList(JSON.stringify(params)),
    queryFn: async () => getUsersInRoom(params),
    enabled: params.isOn,
  });
};
