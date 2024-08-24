import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

type LeaveRoomReq = {
  roomId: string;
};

type LeaveRoomRes = object;

const leaveRoom = async (params: LeaveRoomReq) => {
  const { roomId } = params;
  return await instance.post<LeaveRoomReq, LeaveRoomRes>(
    `/rooms/${roomId}/leave`
  );
};

export const useLeaveRoom = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.ROOM.leave(),
    mutationFn: (params: LeaveRoomReq) => leaveRoom(params),
  });
};
