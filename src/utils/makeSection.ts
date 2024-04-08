import dayjs from "dayjs";

import { TChatMessageDetail } from "@typings/WebsocketMessage.type";

export const makeSection = (chatList: TChatMessageDetail[]) => {
  const sections: { [key: string]: TChatMessageDetail[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format("YYYY-MM-DD");
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
};
