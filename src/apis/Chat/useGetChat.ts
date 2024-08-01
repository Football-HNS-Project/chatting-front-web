import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { TChatMessageDetail } from "@typings/Chat";

import { ErrorResponse } from "@/typings/Error";

type GetChatReq = {
  roomId: string;
};
type GetChatRes = {
  data: {
    room: {
      id: string;
    };
    messages: TChatMessageDetail[];
  };
};

const getChat = async ({ roomId }: GetChatReq): Promise<GetChatRes> => {
  const { data } = await instance.get<GetChatRes>(`/room/${roomId}/messages`);
  return data;
};

export const useGetChat = ({ roomId }: GetChatReq) => {
  return useQuery<GetChatRes, ErrorResponse>({
    queryKey: ["GET_CHAT", roomId],
    queryFn: async () => getChat({ roomId }),
  });
};
