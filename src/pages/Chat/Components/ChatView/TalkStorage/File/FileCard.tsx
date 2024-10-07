import React from "react";

import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";

import dayjs from "dayjs";

import { TFile } from "@typings/Chat";

type FileCardProps = {
  file: Omit<TFile, "id" | "uploadedAt">;
};

const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const isValidExtension = (
  extension: string
): extension is DefaultExtensionType => {
  return extension in defaultStyles;
};

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const extension = getFileExtension(file.name);
  const validExtension = isValidExtension(extension) ? extension : "txt";

  return (
    <div className="flex h-full flex-col gap-4 border p-4">
      <div className="w-[50px]">
        <FileIcon
          extension={validExtension}
          {...defaultStyles[validExtension]}
        />
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col">
          <h3 className="truncate text-sm font-medium">{file.name}</h3>
          {/* TODO 24.10.07 : 추후 유효기간 필드로 변경 */}
          <p className="text-xs text-gray-400">
            유효기간: {dayjs().format("YYYY.MM.DD")}
          </p>
        </div>
        <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
};
