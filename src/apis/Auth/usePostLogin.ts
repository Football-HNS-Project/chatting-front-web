import { messaging } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "firebase/messaging";

import { instance } from "@apis/AxiosInstance";

import { TErrorRes } from "@typings/Axios";

type PostLoginReq = {
  username: string;
  password: string;
  deviceType: "WEB" | "IOS" | "ANDROID";
  fcmToken?: string; // Optional FCM token
};

type PostLoginRes = {
  accessToken: string;
  refreshToken: string;
};

// FCM 관련 로직을 별도 함수로 분리
const getFCMTokenIfPossible = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.warn("FCM token generation failed:", error);
    return null;
  }
};

// 로그인 함수 - FCM 토큰 없이도 동작
const postLogin = async (params: PostLoginReq) => {
  try {
    // FCM 토큰을 비동기적으로 가져오되, 실패해도 계속 진행
    const fcmToken = await getFCMTokenIfPossible();

    return await instance.post<PostLoginReq, PostLoginRes>("/login", {
      ...params,
      ...(fcmToken && { fcmToken }), // FCM 토큰이 있을 때만 포함
    });
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const usePostLogin = () => {
  return useMutation<PostLoginRes, TErrorRes, PostLoginReq>({
    mutationFn: postLogin,
  });
};
