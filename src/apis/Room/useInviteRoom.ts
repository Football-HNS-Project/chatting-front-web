import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

type InviteRoomReq = {
  roomId: string;
  memberIds: string[];
};

type InviteRoomRes = AxiosResponse;

const inviteRoom = async (params: InviteRoomReq) => {
  const { memberIds, roomId } = params;
  return await instance.post<InviteRoomReq, InviteRoomRes>(
    `/rooms/${roomId}/join`,
    { memberIds }
  );
};

export const useInviteRoom = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.ROOM.invite(),
    mutationFn: (params: InviteRoomReq) => inviteRoom(params),
  });
};
