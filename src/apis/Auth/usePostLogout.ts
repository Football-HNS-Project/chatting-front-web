import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";

type PostLogoutReq = object;

type PostLogoutRes = object;

const postLogout = async () => {
  return await instance.post<PostLogoutReq, PostLogoutRes>("/logout");
};

export const usePostLogout = () => {
  return useMutation<PostLogoutRes, TErrorRes, PostLogoutReq>({
    mutationKey: QUERY_KEYS.AUTH.logout(),
    mutationFn: postLogout,
  });
};
