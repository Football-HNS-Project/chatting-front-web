import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";

import { ErrorResponse } from "@/typings/Error";

type GetExampleReq = {
  page: number;
};
type GetExampleRes = {
  data: number;
};

const getExample = async ({ page }: GetExampleReq): Promise<GetExampleRes> => {
  const { data } = await instance.get<GetExampleRes>("/project", {
    params: { page },
  });
  return data;
};

export const useGetExample = (page: number) => {
  return useQuery<GetExampleRes, ErrorResponse>({
    queryKey: ["GET_Example", page],
    queryFn: async () => getExample({ page }),
  });
};
