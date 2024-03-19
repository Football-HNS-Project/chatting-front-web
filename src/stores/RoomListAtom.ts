import { atom } from "jotai";

import { GetRoomsRes } from "@typings/WebsocketMessage.type";

export const RoomListAtom = atom<GetRoomsRes["data"]["rooms"]>([]);
