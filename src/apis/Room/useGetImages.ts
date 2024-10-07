import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TFile } from "@typings/Chat";
import { TPage } from "@typings/Page";

type GetImagesReq = {
  roomId: string;
  page: number;
};

type GetImagesRes = TPage & {
  contents: {
    messagesByDate: {
      [date: string]: {
        id: string;
        senderId: string;
        createdAt: string;
        files: Omit<TFile[], "mimeType" | "uploadedAt">;
      }[];
    };
  }[];
};

const getImages = async (params: GetImagesReq) => {
  const { page, roomId } = params;
  return await instance.get<GetImagesReq, GetImagesRes>(
    `/rooms/${roomId}/images`,
    {
      params: { page, size: 20 },
    }
  );
};

export const useGetImages = (params: GetImagesReq) => {
  return useQuery<GetImagesRes, TErrorRes>({
    queryKey: QUERY_KEYS.ROOM.images(JSON.stringify(params)),
    queryFn: () => getImages(params),
  });
};
