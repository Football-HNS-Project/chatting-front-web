import { atom } from "jotai";

type TTabMenu = { label: "구성원" | "채팅방"; path: "user" | "room" };

export const TAB_MENU: TTabMenu[] = [
  { label: "구성원", path: "user" },
  { label: "채팅방", path: "room" },
];

export const TabAtom = atom<TTabMenu["path"]>(
  location.pathname.split("/")[1] === "user" ? "user" : "room"
);
