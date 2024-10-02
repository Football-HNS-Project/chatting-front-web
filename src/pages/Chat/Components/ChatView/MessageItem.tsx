import React, { useCallback } from "react";

import { Download, FileIcon } from "lucide-react";

import { TChatMessageDetail, TFile } from "@typings/Chat";
import { TUser } from "@typings/User";

import { useModal } from "@components/Modal/useModal";

import { ImageViewModal } from "./ImageViewModal";

type MessageItemProps = {
  message: TChatMessageDetail;
  isCurrentUser: boolean;
  displayProfile: boolean;
  isStandardMessage: boolean;
  timeValue: string;
  showTime: boolean;
};

const SystemMessage: React.FC<{ plainText: string }> = React.memo(
  ({ plainText }) => (
    <div className="flex justify-center">
      <span className="rounded-3xl bg-slate-200 px-6 py-1 text-[14px]">
        {plainText}
      </span>
    </div>
  )
);

const ImageMessage = ({
  file,
  sender,
  createdAt,
}: {
  file: TFile;
  sender: Omit<TUser, "email">;
  createdAt: string;
}) => {
  const { showCustomModal, closeCustomModal } = useModal();
  const handleImageClick = useCallback(() => {
    showCustomModal({
      displayComponent: (
        <ImageViewModal
          sender={sender}
          createdAt={createdAt}
          file={file}
          closeModal={closeCustomModal}
        />
      ),
    });
  }, [file, sender, createdAt, showCustomModal, closeCustomModal]);

  return (
    <img
      onClick={handleImageClick}
      src={file.url}
      alt="Sent image"
      className="max-h-[200px] max-w-[200px] cursor-pointer rounded-lg object-contain"
    />
  );
};

const FileMessage = ({ file }: { file: TFile }) => {
  const fileSize = `${(file.size / 1024).toFixed(1)} KB`;

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [file]);

  return (
    <div className="flex min-w-[200px] max-w-[300px] flex-col rounded-lg border bg-white p-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 self-center">
          <FileIcon size={30} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-semibold">{file.name}</span>
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
};

const TextMessage = ({ plainText }: { plainText: string }) => (
  <div className="w-fit max-w-[484px] whitespace-pre-wrap break-words break-keep rounded-lg bg-gray-200 p-[8px] text-[14px]">
    {plainText}
  </div>
);

export const MessageItem: React.FC<MessageItemProps> = React.memo(
  ({ message, isCurrentUser, displayProfile, timeValue, showTime }) => {
    if (message.senderType === "SYSTEM") {
      return <SystemMessage plainText={message.plainText} />;
    }

    const renderMessageContent = () => {
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
          return <TextMessage plainText={message.plainText} />;
      }
    };

    return (
      <div
        className={`flex ${
          isCurrentUser ? "flex-row-reverse self-end" : "flex-row self-start"
        } mt-1`}
      >
        <div className="flex">
          {!isCurrentUser &&
            (displayProfile ? (
              <div className="h-[40px] w-[40px] rounded-3xl bg-slate-400" />
            ) : (
              <div className="w-[40px]" />
            ))}

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
