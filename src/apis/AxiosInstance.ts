import axios, { AxiosInstance } from "axios";

import { setInterceptors } from "@apis/AxiosInterceptors";

const createInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_HTTP_SERVER}`,
    withCredentials: true,
  });
  return setInterceptors(instance);
};

export const instance = createInstance();
