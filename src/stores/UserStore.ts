import { atom } from "jotai";

export const User_Dummy = [
  { id: 1, name: "김도현" },
  { id: 2, name: "조현준" },
  { id: 3, name: "노영삼" },
  { id: 4, name: "한봉훈" },
];

export const UserAtom = atom({ id: 1, name: "김도현" });
