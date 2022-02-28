import { ReactElement, useEffect, useState } from "react";
import "./modal.css";

type PropsType = {
  children: ReactElement;
  isOpen: true | false;
  onClose(): void;
};

function Modal({ children, isOpen = false, onClose = () => {} }: PropsType) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <span>{children}</span>
    </div>
  );
}

export default Modal;
