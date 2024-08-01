import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

type PostLoginReq = {
  username: string;
  password: string;
};

type PostLoginRes = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  username,
  password,
}: PostLoginReq): Promise<PostLoginRes> => {
  return await instance
    .post("/login", { username, password })
    .then((res) => res.data);
};

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ["POST_LOGIN"],
    mutationFn: async ({ username, password }: PostLoginReq) =>
      postLogin({ username, password }),
  });
};
