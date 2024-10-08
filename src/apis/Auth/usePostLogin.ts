import { messaging } from "@firebase";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getToken } from "firebase/messaging";

import { instance } from "@apis/AxiosInstance";

import { TErrorRes } from "@typings/Axios";

type PostLoginReq = {
  username: string;
  password: string;
};

type PostLoginRes = {
  accessToken: string;
  refreshToken: string;
};

const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

const postLogin = async (params: PostLoginReq): Promise<PostLoginRes> => {
  try {
    const res = await instance.post<PostLoginReq, PostLoginRes>(
      "/login",
      params
    );

    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      console.log("Notification permission not granted.");
      return res;
    }

    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      if (token) {
        console.log("Token generated:", token);
        await instance.post(
          "/fcm",
          { fcmToken: token, expiredAt: dayjs().add(1, "day").toISOString() },
          { headers: { Authorization: `Bearer ${res.accessToken}` } }
        );
      } else {
        console.log("No registration token available.");
      }
    } catch (fcmError) {
      console.error("Error generating FCM token:", fcmError);
      // FCM 토큰 생성 실패를 처리하되, 로그인 프로세스는 계속 진행
    }

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const usePostLogin = () => {
  return useMutation<PostLoginRes, TErrorRes, PostLoginReq>({
    mutationFn: postLogin,
  });
};
