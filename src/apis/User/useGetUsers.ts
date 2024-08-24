import { useQuery } from "@tanstack/react-query";

import { instance } from "@apis/AxiosInstance";
import { QUERY_KEYS } from "@apis/QUERY_KEYS";

import { TErrorRes } from "@typings/Axios";
import { TUser } from "@typings/User";

type GetUsersReq = object;

type GetUsersRes = Omit<TUser, "email">[];

const getUsers = async () => {
  return await instance.get<GetUsersReq, GetUsersRes>("/users");
};

export const useGetUsers = () => {
  return useQuery<GetUsersRes, TErrorRes>({
    queryKey: QUERY_KEYS.USER.list(),
    queryFn: () => getUsers(),
  });
};
