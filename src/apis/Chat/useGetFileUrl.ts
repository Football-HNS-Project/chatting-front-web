import { useMutation } from "@tanstack/react-query";

import { fileInstance } from "@apis/FileInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";

type GetFileUrlReq = {
  fileName: File["name"];
  contentType: File["type"];
  fileSize: File["size"];
};

type GetFileUrlRes = {
  preSignedUrl: string;
  fileUrl: string;
};

const getFileUrl = async (params: GetFileUrlReq) => {
  return await fileInstance.post<GetFileUrlReq, GetFileUrlRes>(
    "/files/upload-url",
    params
  );
};

export const useGetFileUrl = () => {
  return useMutation<GetFileUrlRes, TErrorRes, GetFileUrlReq>({
    mutationKey: QUERY_KEYS.CHAT.fileUrl(),
    mutationFn: (params) => getFileUrl(params),
  });
};
