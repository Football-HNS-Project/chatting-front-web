import React from "react";

import { TChatMessageDetail } from "@typings/Chat";

import { FileMessage } from "./FileMessage";
import { ImageMessage } from "./ImageMessage";
import { TextMessage } from "./TextMessage";

type MessageContentProps = {
  message: TChatMessageDetail;
  isCurrentUser: boolean;
  timeValue: string;
  showTime: boolean;
};
export const MessageContent = React.memo(
  ({ message, isCurrentUser, showTime, timeValue }: MessageContentProps) => {
    const renderMessage = () => {
      switch (message.messageType) {
        case "IMAGE":
          return (
            <ImageMessage
              file={message.files[0]}
              sender={message.sender}
              createdAt={message.createdAt}
            />
          );
        case "FILE":
          return <FileMessage file={message.files[0]} />;
        default:
          return (
            <TextMessage
              isCurrentUser={isCurrentUser}
              plainText={message.plainText}
            />
          );
      }
    };

    return (
      <div
        className={`flex items-end ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        } gap-2`}
      >
        <div
          className={`flex ${
            isCurrentUser ? "items-end" : "ml-12 items-start"
          }`}
        >
          {renderMessage()}
        </div>

        {showTime && (
          <div className="self-end text-[10px] text-gray-400">{timeValue}</div>
        )}
      </div>
    );
  }
);
