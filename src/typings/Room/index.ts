import { TUser } from "@typings/User";

export type TRoom = {
  id: string;
  name: string;
  members: Omit<TUser, "email">[];
  createdAt: string;
  latestMessage: {
    id: string;
    content: string;
    createdAt: string;
  };
};

export type TRoomInfo = {
  id: string;
  name: string;
  memberSize: number;
};
