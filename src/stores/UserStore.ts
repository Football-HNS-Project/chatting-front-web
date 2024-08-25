import { atom } from "jotai";

import { TUser } from "@typings/User";

export const MyInfoAtom = atom<TUser | null>(null);
