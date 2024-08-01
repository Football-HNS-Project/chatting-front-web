import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

type PostExampleReq = {
  username: string;
  password: string;
};

type PostExampleRes = {
  accessToken: string;
  refreshToken: string;
};

const postExample = async ({
  username,
  password,
}: PostExampleReq): Promise<PostExampleRes> => {
  return await instance
    .post("/example", { username, password })
    .then((res) => res.data);
};

export const usePostExample = () => {
  return useMutation({
    mutationKey: ["POST_Example"],
    mutationFn: async ({ username, password }: PostExampleReq) =>
      postExample({ username, password }),
  });
};
