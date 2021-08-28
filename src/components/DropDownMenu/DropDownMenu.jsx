import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { DropDownWrapper } from "./DDMenuStyles";

function DropDownMenu({ isOpen = false, onClose = () => {}, children }) {
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    const docClickHandler = () => {
      if (isOpenRef.current) onClose();
    };
    document.addEventListener("click", docClickHandler);
    setTimeout(() => (isOpenRef.current = isOpen), 500);
    return () => document.removeEventListener("click", docClickHandler);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DropDownWrapper onClick={(e) => e.stopPropagation()}>
      <div className="menu-wrapper">{children}</div>
    </DropDownWrapper>
  );
}

export default DropDownMenu;
