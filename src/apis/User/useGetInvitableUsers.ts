import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TUser } from "@typings/User";

type GetInvitableUsersReq = {
  roomId: string;
};

type GetInvitableUsersRes = Omit<TUser, "email">[];

const invitableUsers = async (params: GetInvitableUsersReq) => {
  const { roomId } = params;
  return await instance.get<GetInvitableUsersReq, GetInvitableUsersRes>(
    `/rooms/${roomId}/invitable-members`
  );
};

export const useGetInvitableUsers = (params: GetInvitableUsersReq) => {
  return useQuery<GetInvitableUsersRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.invitableUserList(JSON.stringify(params)),
    queryFn: () => invitableUsers(params),
  });
};
