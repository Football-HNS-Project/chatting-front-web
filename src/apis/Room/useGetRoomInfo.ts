import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";

type GetRoomInfoReq = {
  roomId: string;
};

type GetRoomInfoRes = {
  id: string;
  name: string;
  memberSize: number;
  createdAt: string;
  updatedAt: string;
};

const getRoomInfo = async (params: GetRoomInfoReq) => {
  const { roomId } = params;
  return await instance.get<GetRoomInfoReq, GetRoomInfoRes>(`/rooms/${roomId}`);
};

export const useGetRoomInfo = (params: GetRoomInfoReq) => {
  return useQuery<GetRoomInfoRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.detail(JSON.stringify(params)),
    queryFn: () => getRoomInfo(params),
    placeholderData: keepPreviousData,
  });
};
