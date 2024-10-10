import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TErrorRes } from "@typings/Axios";

type CheckReadReq = {
  roomId: string;
};

type CheckReadRes = {
  roomId: string;
};

const checkRead = async (params: CheckReadReq) => {
  const { roomId } = params;
  return await instance.post<CheckReadReq, CheckReadRes>(
    `/rooms/${roomId}/messages/mark-as-read`
  );
};

export const useCheckRead = () => {
  return useMutation<CheckReadRes, TErrorRes, CheckReadReq>({
    mutationFn: (params: CheckReadReq) => checkRead(params),
  });
};
