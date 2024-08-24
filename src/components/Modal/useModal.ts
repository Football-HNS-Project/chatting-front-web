import React from "react";

import ModalContext from "./ModalContext";

export const useModal = () => {
  const context = React.useContext(ModalContext);

  if (!context)
    throw new Error("useModalContext must be used within a ModalProvider.");

  return context;
};
