import React from "react";

import { Download, FileIcon } from "lucide-react";

import { TChatMessageDetail } from "@typings/Chat";

import { useModal } from "@components/Modal/useModal";

import { ImageViewModal } from "./ImageViewModal";

export const MessageItem: React.FC<{
  message: TChatMessageDetail;
  isCurrentUser: boolean;
  displayProfile: boolean;
  isStandardMessage: boolean;
  timeValue: string;
  standardMessageRef: React.RefObject<HTMLDivElement>;
  showTime: boolean;
}> = React.memo(
  ({
    message,
    isCurrentUser,
    displayProfile,
    isStandardMessage,
    timeValue,
    standardMessageRef,
    showTime,
  }) => {
    const { showCustomModal, closeCustomModal } = useModal();

    if (message.senderType === "SYSTEM") {
      return (
        <div className="flex justify-center">
          <span className="rounded-3xl bg-slate-200 px-6 py-1 text-[14px]">
            {message.plainText}
          </span>
        </div>
      );
    }

    const renderMessageContent = () => {
      // 메세지가 이미지일 경우
      if (message.messageType === "IMAGE") {
        return (
          <img
            onClick={() => {
              showCustomModal({
                displayComponent: (
                  <ImageViewModal
                    sender={message.sender}
                    createdAt={message.createdAt}
                    file={message.files[0]}
                    closeModal={closeCustomModal}
                  />
                ),
              });
            }}
            src={message.files[0].url}
            alt="Sent image"
            className="max-h-[200px] max-w-[200px] cursor-pointer rounded-lg object-contain"
          />
        );
      }
      // 메세지가 파일일 경우
      else if (message.messageType === "FILE") {
        const file = message.files[0];
        const fileSize = (file.size / 1024).toFixed(1) + " KB";

        const handleDownload = () => {
          const link = document.createElement("a");
          link.href = file.url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return (
          <div className="flex max-w-[300px] flex-col rounded-lg border bg-white p-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 self-center">
                <FileIcon size={30} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">{fileSize}</span>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 self-end rounded-md px-2 py-1 text-sm hover:bg-gray-50"
            >
              <Download size={16} />
              저장
            </button>
          </div>
        );
      }
      // 메세지가 TEXT일 경우
      return (
        <div className="w-fit max-w-[484px] whitespace-pre-wrap break-words break-keep rounded-lg bg-gray-200 p-[8px] text-[14px]">
          {message.plainText}
        </div>
      );
    };

    return (
      <div
        ref={isStandardMessage ? standardMessageRef : null}
        className={`flex ${
          isCurrentUser ? "flex-row-reverse self-end" : "flex-row self-start"
        } mt-1`}
      >
        <div className="flex">
          {displayProfile && !isCurrentUser ? (
            <div className="h-[40px] w-[40px] rounded-3xl bg-slate-400" />
          ) : !isCurrentUser ? (
            <div className="w-[40px]" />
          ) : null}

          <div className="ml-[5px]">
            {displayProfile && !isCurrentUser && (
              <p className="mb-[5px]">{message.sender.name}</p>
            )}
            {renderMessageContent()}
          </div>
        </div>
        {showTime && (
          <div className="mx-2 self-end text-[10px]">{timeValue}</div>
        )}
      </div>
    );
  }
);
