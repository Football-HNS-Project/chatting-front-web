import { changeDate } from "@utils/changeDate";

import { TChatMessageDetail } from "@typings/WebsocketMessage.type";

export const checkDisplayTime = (
  chats: TChatMessageDetail[],
  chat: TChatMessageDetail,
  index: number
) => {
  let displayTime = true;
  const timeValue = changeDate(chat.createdAt);
  if (index !== chats.length - 1) {
    const nextSender = chats[index + 1]?.sender;
    if (nextSender === chat.sender) {
      const nextTimeValue = changeDate(chats[index + 1].createdAt);
      if (timeValue === nextTimeValue) {
        displayTime = false;
      }
    }
  }
  return [displayTime, timeValue];
};
