import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { DrawerWrapper } from "../../../styled-components";

function Drawer({
  children,
  width = "300px",
  onClose = () => {},
  isOpen = false,
}) {
  const contentRef = useRef(null);

  const onDrawerClose = () => {
    contentRef.current.style.setProperty("transform", `translateX(${width})`);
    setTimeout(() => {
      onClose();
    }, 310);
  };

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current && isOpen) {
        contentRef.current.style.setProperty("transform", "translateX(0px)");
      }
    }, 200);
  }, [isOpen]);

  return isOpen ? (
    <DrawerWrapper contentWidth={width}>
      <div className="spaceholder" onClick={onDrawerClose}></div>
      <div ref={contentRef} className="d-content">
        <div className="close">
          <span onClick={onDrawerClose} className="icon">
            <FaTimes />
          </span>
        </div>
        {children}
      </div>
    </DrawerWrapper>
  ) : (
    ""
  );
}

export default Drawer;
