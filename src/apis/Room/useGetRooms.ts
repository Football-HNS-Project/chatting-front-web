import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TRoom } from "@typings/Room";

import { ErrorResponse } from "@/typings/Error";

type GetRoomsRes = {
  data: {
    rooms: TRoom[];
  };
};

const getRooms = async (): Promise<GetRoomsRes> => {
  const { data } = await instance.get<GetRoomsRes>("/rooms");
  return data;
};

export const useGetRooms = () => {
  return useQuery<GetRoomsRes, ErrorResponse>({
    queryKey: ["GET_ROOMS"],
    queryFn: async () => getRooms(),
  });
};
