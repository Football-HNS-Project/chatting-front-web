import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";

type GetMyInfoReq = object;

type GetMyInfoRes = {
  id: string;
  name: string;
  email: string;
};

const getMyInfo = async () => {
  return await instance.get<GetMyInfoReq, GetMyInfoRes>("/users/me");
};

export const useGetMyInfo = () => {
  return useQuery<GetMyInfoRes, TErrorRes>({
    queryKey: QUERY_KEYS.USER.myInfo(),
    queryFn: () => getMyInfo(),
  });
};
