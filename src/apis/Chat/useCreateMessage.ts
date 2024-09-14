import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TChatMessageDetail } from "@typings/Chat";

type CreateMessageReq = {
  roomId: string;
  messageInfo: Pick<
    TChatMessageDetail,
    "messageType" | "plainText" | "files" | "options" | "replyTo"
  >;
};

type CreateMessageRes = object;

const createMessage = async (params: CreateMessageReq) => {
  console.log(params);
  const { roomId } = params;
  return await instance.post<CreateMessageReq, CreateMessageRes>(
    `/rooms/${roomId}/messages`,
    params.messageInfo
  );
};

export const useCreateMessage = () => {
  return useMutation<CreateMessageRes, TErrorRes, CreateMessageReq>({
    mutationKey: QUERY_KEYS.CHAT.create(),
    mutationFn: (params: CreateMessageReq) => createMessage(params),
  });
};
