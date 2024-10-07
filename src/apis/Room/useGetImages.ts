import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TTalkStorage } from "@typings/Chat";
import { TPage } from "@typings/Page";

type GetImagesReq = {
  roomId: string;
  page: number;
  messageType: TTalkStorage["messageType"];
};

type GetImagesRes = TPage & {
  contents: TTalkStorage[];
};

const getImages = async (params: GetImagesReq) => {
  const { page, roomId, messageType } = params;
  return await instance.get<GetImagesReq, GetImagesRes>(
    `/rooms/${roomId}/messages`,
    {
      params: { page, size: Number.MAX_SAFE_INTEGER, messageType },
    }
  );
};

export const useGetImages = (params: GetImagesReq) => {
  return useQuery<GetImagesRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.images(JSON.stringify(params)),
    queryFn: () => getImages(params),
  });
};
