import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyAM4Cu9EFUKSOIfUkLkEuU_dNJ5zeNAg2w",
  authDomain: "chat-fcm-b4c53.firebaseapp.com",
  projectId: "chat-fcm-b4c53",
  storageBucket: "chat-fcm-b4c53.appspot.com",
  messagingSenderId: "527943414926",
  appId: "1:527943414926:web:52b0d1bf263d69273485df",
  measurementId: "G-15ZPSVHCVL",
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

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  const senderName = payload.data!.senderName;
  const roomName = payload.data!.roomName;
  const plainText = payload.data!.plainText;
  console.log(senderName);
  console.log(roomName);

  // // 가시성 상태 확인 (현재 탭이 활성화되어 있으면 알림 표시 안 함)
  // if (document.visibilityState === "visible") {
  //   console.log("탭이 활성화되어 있으므로 알림을 표시하지 않습니다.");
  //   return;
  // }

  // 탭이 비활성화(백그라운드)에 있을 때만 알림 표시
  const notificationOptions = {
    body: `${senderName}: ${plainText}`, // 발신자 이름과 메시지 본문을 표시
    icon: "https://picsum.photos/200/300",
    url: "https://picsum.photos/id/1/200/300",
    status: "open",
  };

  // 기존 활성화된 알림이 있으면 닫음
  if (activeNotification) {
    activeNotification.close();
  }

  // 새 알림 생성
  activeNotification = new Notification(roomName, notificationOptions);

  // 알림이 일정 시간이 지나면 자동으로 닫히도록 설정
  setTimeout(() => {
    if (activeNotification) {
      activeNotification.close();
      activeNotification = null; // 알림이 닫히면 변수 초기화
    }
  }, 5000); // 5초 후 닫힘

  // 알림 클릭 시 원하는 동작 설정
  activeNotification.onclick = function () {
    window.open(notificationOptions.url, "_blank");
  };
});
