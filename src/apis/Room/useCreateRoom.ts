import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { instance } from "@apis/AxiosInstance";

type CreateRoomReq = {
  name: string;
  participants: number[];
};

type CreateRoomRes = AxiosResponse;

const createRoom = async ({
  name,
  participants,
}: CreateRoomReq): Promise<CreateRoomRes> => {
  return await instance
    .post("/room", { name, participants })
    .then((res) => res);
};

export const useCreateRoom = () => {
  return useMutation({
    mutationKey: ["CREATE_ROOM"],
    mutationFn: async ({ name, participants }: CreateRoomReq) =>
      createRoom({ name, participants }),
  });
};
