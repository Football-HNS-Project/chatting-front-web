import axios, { AxiosInstance } from "axios";

import { setInterceptors } from "@apis/AxiosInterceptors";

const createInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: "/api/pms",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return setInterceptors(instance);
};
export const instance = createInstance();
