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
