import { atom } from "jotai";

import { TRoom } from "@typings/WebsocketMessage.type";

export const RoomListAtom = atom<TRoom[]>([]);
