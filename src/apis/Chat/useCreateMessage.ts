import { useMutation } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TFile, TMessageType } from "@typings/Chat";

type CreateMessageReq = {
  roomId: string;
  messageInfo: {
    plainText: string;
    messageType: TMessageType;
    options: string[];
    files: Pick<TFile, "name" | "size" | "mimeType" | "url">[];
    replyTo: string | null;
  };
};

type CreateMessageRes = object;

const createMessage = async (params: CreateMessageReq) => {
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
