import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";

type PostLoginReq = {
  username: string;
  password: string;
};

type PostLoginRes = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async (params: PostLoginReq) => {
  return await instance.post<PostLoginReq, PostLoginRes>("/login", params);
};

export const usePostLogin = () => {
  return useMutation<PostLoginRes, TErrorRes, PostLoginReq>({
    mutationKey: QUERY_KEYS.AUTH.login(),
    mutationFn: postLogin,
  });
};
