import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TUser } from "@typings/User";

type InvitableRoomReq = {
  roomId: string;
};

type InvitableRoomRes = {
  users: TUser[];
};

const invitableRoom = async ({
  roomId,
}: InvitableRoomReq): Promise<InvitableRoomRes> => {
  const { data } = await instance.get(`/room/${roomId}/invitable`);
  return data;
};

export const useInvitableRoom = () => {
  return useMutation({
    mutationKey: ["INVITABLE_ROOM"],
    mutationFn: async ({ roomId }: InvitableRoomReq) =>
      invitableRoom({ roomId }),
  });
};
