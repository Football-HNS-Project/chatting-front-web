import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { TErrorRes } from "@typings/Axios";

const AUTH_ERROR_CODES = new Set([
  "AUTHENTICATION_FAILED",
  "REFRESH_TOKEN_EXPIRED",
  "UNSUPPORTED_TOKEN",
  "MALFORMED_TOKEN",
  "ILLEGAL_TOKEN",
  "SIGNATURE_ERROR",
  "REFRESH_TOKEN_IS_NULL",
  "INVALID_REFRESH_TOKEN",
  "ACCESS_TOKEN_EXPIRED",
]);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

export const setInterceptors = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error: TErrorRes) => {
      if (!error.response) return Promise.reject(error);

      const { status, data } = error.response;
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (status === 401 && AUTH_ERROR_CODES.has(data.errorCode)) {
        if (data?.errorCode === "ACCESS_TOKEN_EXPIRED") {
          return handleTokenRefresh(axiosInstance, originalRequest);
        } else {
          handleAuthError();
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const handleTokenRefresh = async (
  axiosInstance: AxiosInstance,
  originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const newToken = await refreshToken(axiosInstance);
      onRefreshed(newToken);
      return retryOriginalRequest(axiosInstance, originalRequest, newToken);
    } catch (refreshError) {
      handleAuthError();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  } else {
    return new Promise((resolve) => {
      addRefreshSubscriber((token: string) => {
        resolve(retryOriginalRequest(axiosInstance, originalRequest, token));
      });
    });
  }
};

const onRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

const refreshToken = async (axiosInstance: AxiosInstance): Promise<string> => {
  const { accessToken: newAccessToken } = await axiosInstance.post<
    object,
    { accessToken: string }
  >("/tokens/reissue");
  localStorage.setItem("accessToken", newAccessToken);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  return newAccessToken;
};

const retryOriginalRequest = (
  axiosInstance: AxiosInstance,
  originalRequest: InternalAxiosRequestConfig,
  token: string
) => {
  originalRequest.headers.Authorization = `Bearer ${token}`;
  return axiosInstance(originalRequest);
};

const handleAuthError = (): void => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};
