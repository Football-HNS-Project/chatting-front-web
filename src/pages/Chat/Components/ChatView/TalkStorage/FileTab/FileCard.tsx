import { FileIcon, defaultStyles } from "react-file-icon";

import dayjs from "dayjs";
import mime from "mime-types";

import { TFile } from "@typings/Chat";

import { formatFileSize, isValidExtension } from "./utils";

type FileCardProps = {
  file: TFile;
};

export const FileCard = ({ file }: FileCardProps) => {
  const extension = mime.extension(file.mimeType);
  const validExtension = isValidExtension(extension) ? extension : "txt";

  return (
    <div className="flex h-full cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-md hover:shadow-lg">
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
