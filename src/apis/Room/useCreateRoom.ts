import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TRoomType } from "@typings/Room";

type CreateRoomReq = {
  name: string;
  memberIds: string[];
  roomType: TRoomType;
};

type CreateRoomRes = {
  roomId: string;
};

const createRoom = async (params: CreateRoomReq) => {
  return await instance.post<CreateRoomReq, CreateRoomRes>("/rooms", params);
};

export const useCreateRoom = () => {
  return useMutation<CreateRoomRes, TErrorRes, CreateRoomReq>({
    mutationKey: QUERY_KEYS.ROOM.create(),
    mutationFn: (params: CreateRoomReq) => createRoom(params),
  });
};
