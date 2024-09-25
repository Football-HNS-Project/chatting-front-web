import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  File,
  FileIcon,
  FileSpreadsheet,
  FileText,
  ImageIcon,
} from "lucide-react";

type FilePreviewModalProps = {
  file: File;
  preSignedUrl: string;
  closeModal: () => void;
  handleSend: () => void;
};

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  file,
  preSignedUrl,
  closeModal,
  handleSend,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": file.type,
        "x-amz-tagging": "status=temporary",
      },
    });
    handleSend();
  };

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const formatFileName = (name: string) => {
    if (name.length <= 20) return name;
    const ext = name.split(".").pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf("."));
    return `${nameWithoutExt.slice(0, 8)}...${nameWithoutExt.slice(-8)}.${ext}`;
  };

  const formatFileSize = (size: number) => {
    const kbSize = size / 1024;
    return `${kbSize.toFixed(2)} KB`;
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon;
    if (fileType === "application/pdf") return FileIcon;
    if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return FileText;
    if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
      return FileSpreadsheet;
    return File;
  };

  const FileTypeIcon = getFileIcon(file.type);

  return (
    <div className="flex w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="mb-4 text-xl font-bold text-gray-800">파일 전송</h2>
      <div className="mb-4 max-h-[60vh] overflow-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            {file.type.startsWith("image/") ? (
              <img
                src={preview || ""}
                alt="File preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <FileTypeIcon size={48} className="text-gray-400" />
            )}
          </div>
          <div className="text-center">
            <p className="font-medium">{formatFileName(file.name)}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          전송
        </button>
      </div>
    </div>
  );
};
