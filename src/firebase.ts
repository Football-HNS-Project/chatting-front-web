import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../public/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service Worker registration failed:", err);
    });
}

let activeNotification: Notification | null = null;
let activeNotificationTimer: number | null = null;

onMessage(messaging, (payload) => {
  const senderName = payload.data?.senderName;
  const roomName = payload.data?.roomName;
  const roomId = payload.data?.roomId;
  const plainText = payload.data?.plainText;

  if (!senderName || !roomName || !roomId || !plainText) {
    console.error("Invalid payload data", payload.data);
    return;
  }

  const notificationUrl = `${import.meta.env.VITE_DOMAIN}/room/${roomId}`;

  const notificationOptions: NotificationOptions = {
    body: `${senderName}: ${plainText}`,
    icon: "https://picsum.photos/200/300",
    tag: `chat-${roomId}`,
    data: { url: notificationUrl },
  };

  // 기존 활성화된 알림이 있으면 즉시 닫음
  if (activeNotification) {
    console.log("Closing active notification:", activeNotification.body);
    activeNotification.close();
    activeNotification = null;

    // 기존 타이머가 있다면 제거
    if (activeNotificationTimer !== null) {
      clearTimeout(activeNotificationTimer);
      activeNotificationTimer = null;
    }
  }

  // 새 알림 표시
  if (Notification.permission === "granted") {
    showNotification(roomName, notificationOptions);
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification(roomName, notificationOptions);
      }
    });
  }
});

const showNotification = (title: string, options: NotificationOptions) => {
  activeNotification = new Notification(title, options);
  console.log("Showing new notification:", activeNotification.body);

  // 알림이 일정 시간이 지나면 자동으로 닫히도록 설정
  activeNotificationTimer = window.setTimeout(() => {
    if (activeNotification) {
      console.log(
        "Closing notification after timeout:",
        activeNotification.body
      );
      activeNotification.close();
      activeNotification = null;
      activeNotificationTimer = null;
    }
  }, 5000);

  // 알림 클릭 시 원하는 동작 설정
  activeNotification.onclick = function (event) {
    event.preventDefault();
    const notification = event.target as Notification;
    const url = notification.data?.url;
    if (url) {
      window.open(url, "_blank");
    }
    notification.close();
    activeNotification = null;
    if (activeNotificationTimer !== null) {
      clearTimeout(activeNotificationTimer);
      activeNotificationTimer = null;
    }
  };
};
