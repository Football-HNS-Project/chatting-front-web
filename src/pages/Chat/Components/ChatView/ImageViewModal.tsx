import React, { useState } from "react";

import dayjs from "dayjs";

import { TFile } from "@typings/Chat";
import { TUser } from "@typings/User";

type ImageViewModalProps = {
  sender: Omit<TUser, "email">;
  createdAt: string;
  file: TFile;
  closeModal: () => void;
};

export const ImageViewModal: React.FC<ImageViewModalProps> = ({
  sender,
  createdAt,
  file,
  closeModal,
}: ImageViewModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSave = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(file.url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("파일 다운로드에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-fit w-[700px] flex-col items-center rounded-lg bg-white shadow-2xl">
      <div className="flex w-full flex-row items-center justify-center gap-3 border-b p-2">
        <span className="font-bold">{sender.name}</span>
        <span className="text-sm text-gray-600">
          {dayjs(createdAt).format("YYYY-MM-DD")}
        </span>
      </div>

      <div className="flex w-full p-3">
        <img src={file.url} alt={file.name} className="w-full object-contain" />
      </div>

      <div className="flex w-full justify-end gap-4 border-t p-3">
        <button
          onClick={closeModal}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-300"
        >
          닫기
        </button>
        <button
          onClick={handleSave}
          disabled={isDownloading}
          className={`rounded-md px-4 py-2 text-white transition duration-300 ${
            isDownloading
              ? "cursor-not-allowed bg-blue-300"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isDownloading ? "다운로드 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};
