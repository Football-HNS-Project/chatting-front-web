import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TRoom } from "@typings/Room";

type GetRoomsReq = object;

type GetRoomsRes = TRoom[];

const getRooms = async () => {
  return await instance.get<GetRoomsReq, GetRoomsRes>("/rooms");
};

export const useGetRooms = () => {
  return useQuery<GetRoomsRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.list(),
    queryFn: () => getRooms(),
  });
};
