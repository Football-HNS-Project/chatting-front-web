import { atom } from "jotai";

import { TRoom } from "@typings/Room";

export const RoomListAtom = atom<TRoom[]>([]);
