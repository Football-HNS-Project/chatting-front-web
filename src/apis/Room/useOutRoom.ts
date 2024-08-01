import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { instance } from "@apis/AxiosInstance";

type OutRoomReq = {
  roomId: string;
};

type OutRoomRes = AxiosResponse;

const outRoom = async ({ roomId }: OutRoomReq): Promise<OutRoomRes> => {
  return await instance.post(`/room/${roomId}/leave`).then((res) => res);
};

export const useOutRoom = () => {
  return useMutation({
    mutationKey: ["OUT_ROOM"],
    mutationFn: async ({ roomId }: OutRoomReq) => outRoom({ roomId }),
  });
};
