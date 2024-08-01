import dayjs from "dayjs";

import { TUser } from "@typings/User";
import { TChatMessageDetail } from "@typings/WebsocketMessage.type";

export const checkDisplayProfile = (
  chats: TChatMessageDetail[],
  chat: TChatMessageDetail,
  index: number,
  user: TUser
) => {
  let displayProfile = false;
  const isCreated = dayjs(chat.createdAt);

  if (index !== 0) {
    const prevSender = chats[index - 1]?.sender;
    const prevCreatedDate = dayjs(chats[index - 1].createdAt);
    prevCreatedDate.set("hour", prevCreatedDate.hour() - 9);
    if (
      prevSender !== chat?.sender ||
      prevCreatedDate.date() !== isCreated.date()
    ) {
      displayProfile = true;
    }
  } else {
    displayProfile = true;
  }
  if (chat?.sender === user.id) {
    displayProfile = false;
  }

  return displayProfile;
};
