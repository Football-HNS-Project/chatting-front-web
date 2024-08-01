import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { instance } from "@apis/AxiosInstance";

type InviteRoomReq = {
  roomId: string;
  participants: number[];
};

type InviteRoomRes = AxiosResponse;

const inviteRoom = async ({
  roomId,
  participants,
}: InviteRoomReq): Promise<InviteRoomRes> => {
  return await instance
    .post(`/room/${roomId}/join`, { participants })
    .then((res) => res);
};

export const useInviteRoom = () => {
  return useMutation({
    mutationKey: ["INVITE_ROOM"],
    mutationFn: async ({ roomId, participants }: InviteRoomReq) =>
      inviteRoom({ roomId, participants }),
  });
};
