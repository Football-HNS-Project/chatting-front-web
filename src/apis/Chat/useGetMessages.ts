import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TChatMessageDetail } from "@typings/Chat";

type GetMessagesReq = {
  roomId: string;
  messageId: string | null;
  direction: "before" | "after";
};

type GetMessagesRes = {
  beforeMessages: TChatMessageDetail[];
  afterMessages: TChatMessageDetail[];
  standardMessage: TChatMessageDetail;
  hasPreviousMessages: boolean;
  hasNextMessages: boolean;
};

const getMessages = async (params: GetMessagesReq) => {
  const { roomId, messageId, direction } = params;
  return await instance.get<GetMessagesReq, GetMessagesRes>(
    `/rooms/${roomId}/messages`,
    { params: { messageId, direction } }
  );
};

export const useGetMessages = (initialParams: GetMessagesReq) => {
  const queryClient = useQueryClient();

  const query = useQuery<GetMessagesRes, TErrorRes>({
    queryKey: QUERY_KEYS.CHAT.messages(JSON.stringify(initialParams)),
    queryFn: () => getMessages(initialParams),
  });

  const fetchPreviousMessagesMutation = useMutation<
    GetMessagesRes,
    TErrorRes,
    string
  >({
    mutationFn: (messageId: string) =>
      getMessages({ ...initialParams, messageId, direction: "before" }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        QUERY_KEYS.CHAT.messages(JSON.stringify(initialParams)),
        (oldData: GetMessagesRes | undefined) => {
          if (!oldData) return data;
          return {
            ...oldData,
            beforeMessages: [...data.beforeMessages, ...oldData.beforeMessages],
            hasPreviousMessages: data.hasPreviousMessages,
          };
        }
      );
    },
  });

  return {
    ...query,
    fetchPreviousMessages: fetchPreviousMessagesMutation.mutate,
    fetchPreviousMessagesAsync: fetchPreviousMessagesMutation.mutateAsync,
    isFetchingPreviousMessages: fetchPreviousMessagesMutation.isPending,
  };
};
