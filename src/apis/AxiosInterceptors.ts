import { AxiosInstance } from "axios";

import { instance } from "@apis/AxiosInstance";

export function setInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      instance.defaults.headers["Authorization"] =
        sessionStorage.getItem("accessToken");
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // 응답 (response) interceptor
  axiosInstance.interceptors.response.use(
    // 200 대 response 를 받아 응답 데이터를 가공하는 작업
    (res) => {
      return res;
    },
    // 200 대 이외의 오류 응답을 가공
    async (err) => {
      Promise.reject(err);
    }
  );

  return axiosInstance;
}
