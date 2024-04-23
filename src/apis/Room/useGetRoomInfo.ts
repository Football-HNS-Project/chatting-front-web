import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TRoomInfo } from "@typings/Room";

import { ErrorResponse } from "@/typings/Error";

type GetRoomInfoReq = {
  roomId: string;
};
type GetExampleRes = {
  data: {
    room: TRoomInfo;
  };
};

const getRoomInfo = async ({
  roomId,
}: GetRoomInfoReq): Promise<GetExampleRes> => {
  const { data } = await instance.get<GetExampleRes>(`/room/${roomId}/info`);
  return data;
};

export const useGetRoomInfo = ({ roomId }: GetRoomInfoReq) => {
  return useQuery<GetExampleRes, ErrorResponse>({
    queryKey: ["GET_ROOM_INFO", roomId],
    queryFn: async () => getRoomInfo({ roomId }),
  });
};
