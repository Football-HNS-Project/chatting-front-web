export type TRoom = {
  id: string;
  name: string;
  memberSize: number;
  lastMessage: {
    id: number;
    content: string;
    updatedAt: Date;
  };
};

export type TRoomInfo = {
  id: string;
  name: string;
  memberSize: number;
};
