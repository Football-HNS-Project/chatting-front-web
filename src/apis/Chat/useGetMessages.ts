import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TChatMessageDetail } from "@typings/Chat";

type GetMessagesReq = {
  roomId: string;
  messageId: string | null;
  direction: "asc" | "desc";
};

type GetMessagesRes = {
  beforeMessages: TChatMessageDetail[];
  afterMessages: TChatMessageDetail[];
  standardMessage: TChatMessageDetail;
  hasPreviousMessages: boolean;
  hasNextMessages: boolean;
};

const getMessages = async (params: GetMessagesReq) => {
  const { roomId } = params;
  return await instance.get<GetMessagesReq, GetMessagesRes>(
    `/rooms/${roomId}/messages`
  );
};

export const useGetMessages = (params: GetMessagesReq) => {
  return useQuery<GetMessagesRes, TErrorRes>({
    queryKey: QUERY_KEYS.CHAT.messages(JSON.stringify(params)),
    queryFn: () => getMessages(params),
  });
};
