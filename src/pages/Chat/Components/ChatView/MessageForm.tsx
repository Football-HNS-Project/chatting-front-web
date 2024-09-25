import { useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { Paperclip } from "lucide-react";

import { useCreateMessage } from "@apis/Chat/useCreateMessage";
import { useGetFileUrl } from "@apis/Chat/useGetFileUrl";

import { useModal } from "@components/Modal/useModal";

import { FilePreviewModal } from "./FilePreviewModal";

export const MessageForm = () => {
  const [inputMessage, setInputMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const { mutate } = useCreateMessage();
  const { mutate: mutateFile } = useGetFileUrl();
  const { showCustomModal, closeCustomModal } = useModal();

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    mutate(
      {
        roomId: id ?? "",
        messageInfo: {
          plainText: inputMessage,
          messageType: "TEXT",
          options: [],
          files: [],
          replyTo: null,
        },
      },
      {
        onSuccess: () => {
          setInputMessage("");
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      mutateFile(
        { fileName: file.name, contentType: file.type, fileSize: file.size },
        {
          onSuccess: (data) => {
            if (data.preSignedUrl) {
              showCustomModal({
                displayComponent: (
                  <FilePreviewModal
                    closeModal={() => {
                      closeCustomModal();
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    handleSend={() => {
                      mutate(
                        {
                          roomId: id ?? "",
                          messageInfo: {
                            plainText: "",
                            messageType: file.type.startsWith("image/")
                              ? "IMAGE"
                              : "FILE",
                            options: [],
                            files: [
                              {
                                name: file.name,
                                mimeType: file.type,
                                size: file.size,
                                url: data.fileUrl,
                              },
                            ],
                            replyTo: null,
                          },
                        },
                        {
                          onSuccess: () => {
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                            closeCustomModal();
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          },
                        }
                      );
                    }}
                    file={file}
                    preSignedUrl={data.preSignedUrl}
                  />
                ),
                isBackDrop: false,
              });
            }
            console.log(data);
          },
        }
      );
    }
  };

  return (
    <form
      className="relative m-[16px] flex h-[125px] flex-col justify-between rounded-lg border-[1px] border-gray-900"
      onSubmit={handleSubmit}
    >
      <textarea
        value={inputMessage}
        maxLength={1000}
        placeholder="메시지를 입력해주세요"
        className="mx-[12px] mt-[12px] h-[63px] w-[calc(100%-24px)] resize-none p-0 text-[14px] outline-none"
        onChange={(e) => {
          setInputMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!e.nativeEvent.isComposing && !e.shiftKey) {
              e.preventDefault();
              if (inputMessage.trim().length > 0) {
                handleSubmit(e);
              }
            }
          }
        }}
      />
      <div className="mx-[10px] my-[8px] flex justify-between">
        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Paperclip size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          disabled={inputMessage.trim().length <= 0}
          className={`h-[32px] w-[64px] rounded-md text-[14px] font-bold text-white ${
            inputMessage.trim().length > 0 ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          전송
        </button>
      </div>
      <span className="absolute bottom-[11px] right-[84px] text-[12px] text-gray-500">
        {inputMessage.length}/1000
      </span>
    </form>
  );
};
