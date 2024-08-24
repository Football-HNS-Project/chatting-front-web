import React, { ReactElement } from "react";

import { CustomModalProps } from "@typings/Modal";

import ModalContext from "./ModalContext";

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [customModalInfo, setCustomModal] = React.useState<{
    CustomModal: ReactElement;
    isBackDrop: boolean;
  }>({ CustomModal: <></>, isBackDrop: false });

  const [isCustomModal, setIsCustomModal] = React.useState<boolean>(false);

  const showCustomModal = ({
    displayComponent,
    isBackDrop = true,
  }: CustomModalProps) => {
    setCustomModal({
      CustomModal: displayComponent,
      isBackDrop,
    });
    setIsCustomModal(true);
  };

  const closeCustomModal = () => {
    setIsCustomModal(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (customModalInfo.isBackDrop && e.target === e.currentTarget) {
      closeCustomModal();
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showCustomModal,
        closeCustomModal,
      }}
    >
      {isCustomModal && (
        <div
          className={
            "fixed inset-0 z-[500] h-full w-full bg-black bg-opacity-50"
          }
          onClick={handleBackdropClick}
        >
          <div className="fixed left-1/2 top-1/2 z-[501] -translate-x-1/2 -translate-y-1/2">
            {customModalInfo.CustomModal}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
