import { useCallback } from "react";

import { TFile } from "@typings/Chat";
import { TUser } from "@typings/User";

import { useModal } from "@components/Modal/useModal";

import { ImageViewModal } from "./ImageViewModal";

type ItemMessageeProps = {
  file: TFile;
  sender: Omit<TUser, "email">;
  createdAt: string;
};

export const ImageMessage = ({
  file,
  sender,
  createdAt,
}: ItemMessageeProps) => {
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
