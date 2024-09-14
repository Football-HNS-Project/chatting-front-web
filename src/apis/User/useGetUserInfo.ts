import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TUser } from "@typings/User";

type GetUserInfoReq = {
  userId: string;
};

type GetUserInfoRes = Omit<TUser, "email">;

const getUserInfo = async (params: GetUserInfoReq) => {
  const { userId } = params;
  return await instance.get<GetUserInfoReq, GetUserInfoRes>(`/users/${userId}`);
};

export const useGetUserInfo = (params: GetUserInfoReq) => {
  return useQuery<GetUserInfoRes, TErrorRes>({
    queryKey: QUERY_KEYS.USER.userInfo(JSON.stringify(params)),
    queryFn: () => getUserInfo(params),
  });
};
