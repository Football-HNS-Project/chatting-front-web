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

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: "/firebase-logo.png",
  };
  new Notification(notificationTitle, notificationOptions);
});
