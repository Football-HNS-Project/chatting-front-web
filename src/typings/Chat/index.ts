import { Dayjs } from "dayjs";

export type TChatMessageDetail = {
  id: string;
  type: string;
  sender: number;
  createdAt: Dayjs;
  content: string;
};
