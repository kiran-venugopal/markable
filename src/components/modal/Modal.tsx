import { ReactElement, useEffect, useRef, useState } from "react";
import useContainerClick from "use-container-click";
import "./modal.css";

type PropsType = {
  children: ReactElement;
  isOpen: true | false;
  onClose(): void;
};

function Modal({ children, isOpen = false, onClose = () => {} }: PropsType) {
  const ref = useRef(document.createElement("div"));
  useContainerClick(ref, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <span ref={ref}>{children}</span>
    </div>
  );
}

export default Modal;
