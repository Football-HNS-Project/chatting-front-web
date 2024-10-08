import { useCallback } from "react";

import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";

import { Download } from "lucide-react";
import mime from "mime-types";

import { TFile } from "@typings/Chat";

type FileMessageProps = {
  file: TFile;
};

export const FileMessage = ({ file }: FileMessageProps) => {
  const fileSize = `${(file.size / 1024).toFixed(1)} KB`;

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [file]);
  const isValidExtension = (
    extension: string | false
  ): extension is DefaultExtensionType => {
    return typeof extension === "string" && extension in defaultStyles;
  };

  const extension = mime.extension(file.mimeType);
  const validExtension = isValidExtension(extension) ? extension : "txt";

  return (
    <div className="flex min-w-[200px] max-w-[300px] flex-col rounded-lg border bg-white p-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-[30px] flex-shrink-0">
          <FileIcon
            extension={validExtension}
            {...defaultStyles[validExtension]}
          />
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
