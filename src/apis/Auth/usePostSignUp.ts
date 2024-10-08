import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TErrorRes } from "@typings/Axios";

type PostSignUpReq = {
  username: string;
  password: string;
  name: string;
  email: string;
  profileImageUrl: string;
  phoneNumber: string;
};

type PostSignUpRes = object;

const postSignUp = async (params: PostSignUpReq) => {
  return await instance.post<PostSignUpReq, PostSignUpRes>(
    "/users/sign-up",
    params
  );
};

export const usePostSignUp = () => {
  return useMutation<PostSignUpRes, TErrorRes, PostSignUpReq>({
    mutationFn: postSignUp,
  });
};
