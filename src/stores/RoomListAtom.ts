import { atom } from "jotai";

import { TRoom } from "@typings/WebsocketMessage";

export const RoomListAtom = atom<TRoom[]>([]);
