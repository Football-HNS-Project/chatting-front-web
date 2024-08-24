import React from "react";

import { CustomModalProps } from "@typings/Modal";

const ModalContext = React.createContext<{
  showCustomModal: (props: CustomModalProps) => void;
  closeCustomModal: () => void;
}>({
  showCustomModal: () => {},
  closeCustomModal: () => {},
});

export default ModalContext;
