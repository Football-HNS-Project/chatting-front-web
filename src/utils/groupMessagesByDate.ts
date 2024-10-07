import dayjs from "dayjs";

import { TChatMessageDetail } from "@typings/Chat";

const groupMessagesByDate = (
  messages: TChatMessageDetail[]
): Record<string, TChatMessageDetail[]> => {
  return messages.reduce(
    (groupedMessages, message) => {
      const formattedDate = dayjs(message.createdAt).format("YYYY년 M월 D일");
      if (!groupedMessages[formattedDate]) {
        groupedMessages[formattedDate] = [];
      }
      groupedMessages[formattedDate].push(message);
      return groupedMessages;
    },
    {} as Record<string, TChatMessageDetail[]>
  );
};

export const createGroupedMessageStructure = (
  messages: TChatMessageDetail[]
) => {
  const messagesByDate = groupMessagesByDate(messages);
  return Object.entries(messagesByDate).map(([date, messagesOnDate]) => {
    const groupedMessagesByUser = messagesOnDate.reduce(
      (messageGroups, currentMessage, index) => {
        const previousMessage = messagesOnDate[index - 1];
        const shouldStartNewGroup =
          !previousMessage ||
          previousMessage.sender.id !== currentMessage.sender.id ||
          dayjs(currentMessage.createdAt).format("HH:mm") !==
            dayjs(previousMessage.createdAt).format("HH:mm");

        if (shouldStartNewGroup) {
          messageGroups.push([]);
        }
        messageGroups[messageGroups.length - 1].push(currentMessage);
        return messageGroups;
      },
      [] as TChatMessageDetail[][]
    );

    return { date, groupedMessagesByUser };
  });
};
