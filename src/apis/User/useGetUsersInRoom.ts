import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TUser } from "@typings/User";

import { ErrorResponse } from "@/typings/Error";

type GetUsersInRoomReq = {
  roomId: string;
  isOn: boolean;
};
type GetUsersInRoomRes = {
  data: {
    users: TUser[];
  };
};

const getUsersInRoom = async ({
  roomId,
}: GetUsersInRoomReq): Promise<GetUsersInRoomRes> => {
  const { data } = await instance.get<GetUsersInRoomRes>(
    `/room/${roomId}/participants`
  );
  return data;
};

export const useGetUsersInRoom = ({ roomId, isOn }: GetUsersInRoomReq) => {
  return useQuery<GetUsersInRoomRes, ErrorResponse>({
    queryKey: ["GET_USERS_IN_ROOM", roomId, isOn],
    queryFn: async () => getUsersInRoom({ roomId, isOn }),
    enabled: isOn,
  });
};
