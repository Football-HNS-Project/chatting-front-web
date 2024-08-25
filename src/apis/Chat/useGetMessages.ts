import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TChatMessageDetail, TPageable } from "@typings/Chat";

type GetMessagesReq = {
  roomId: string;
};

type GetMessagesRes = TPageable & {
  contents: TChatMessageDetail[];
};

const getMessages = async (params: GetMessagesReq) => {
  const { roomId } = params;
  return await instance.get<GetMessagesReq, GetMessagesRes>(
    `/messages/${roomId}`
  );
};

export const useGetMessages = (params: GetMessagesReq) => {
  return useQuery<GetMessagesRes, TErrorRes>({
    queryKey: QUERY_KEYS.CHAT.messages(JSON.stringify(params)),
    queryFn: () => getMessages(params),
  });
};
