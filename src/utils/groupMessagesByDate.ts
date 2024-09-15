import dayjs from "dayjs";

import { TChatMessageDetail } from "@typings/Chat";

export const groupMessagesByDate = (
  messages: TChatMessageDetail[]
): Record<string, TChatMessageDetail[]> => {
  return messages.reduce(
    (acc, message) => {
      const date = dayjs(message.createdAt).format("YYYY년 M월 D일");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    },
    {} as Record<string, TChatMessageDetail[]>
  );
};
