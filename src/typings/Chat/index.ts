export type TChatMessageDetail = {
  id: string;
  roomId: string;
  content: string;
  messageType: "text";
  createdAt: string;
  sender: {
    id: string;
    name: string;
  };
};

export type TPageable = {
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  isLast: boolean;
};

export type TLastMessage = {
  id: string;
  messageType: TMessageType;
  senderType: TSenderType;
  senderId: string;
  createdAt: string;
  plainText: string;
};
export type TMessageType = "TEXT" | "IMAGE" | "FILE";
export type TSenderType = "USER" | "SYSTEM";
