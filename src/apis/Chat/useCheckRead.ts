import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TErrorRes } from "@typings/Axios";

type CheckReadReq = {
  roomId: string;
  messageId: string;
};

type CheckReadRes = {
  roomId: string;
};

const checkRead = async (params: CheckReadReq) => {
  return await instance.post<CheckReadReq, CheckReadRes>(
    "/messages/mark-as-read",
    params
  );
};

export const useCheckRead = () => {
  return useMutation<CheckReadRes, TErrorRes, CheckReadReq>({
    mutationFn: (params: CheckReadReq) => checkRead(params),
  });
};
