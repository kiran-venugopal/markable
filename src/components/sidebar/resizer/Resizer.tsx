import { MouseEventHandler, MutableRefObject, useEffect, useRef } from "react";
import "./resizer.css";

type PropsType = {
  elementRef: MutableRefObject<HTMLDivElement>;
};

function Resizer({ elementRef }: PropsType) {
  const statusRef = useRef({ isClicked: false });
  const timerRef = useRef<NodeJS.Timeout>();

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    statusRef.current.isClicked = !statusRef.current.isClicked;
  };

  const updateResizer = (pageX: number) => {
    const getWidth = (pageX: number) => {
      if (window.innerWidth <= 800) {
        return pageX <= 16 ? 16 : pageX;
      } else return pageX <= 100 ? 100 : pageX;
    };

    if (statusRef.current.isClicked) {
      const newWidth = getWidth(pageX);

      elementRef.current.style.width = `${newWidth}px`;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () =>
          window.localStorage.setItem(
            "sidebar-width",
            JSON.stringify(newWidth)
          ),
        1000
      );
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // console.log(statusRef.current.startX, e.pa);
      updateResizer(e.pageX);
    };

    const handleDocClick = (e: MouseEvent) => {
      if (statusRef.current.isClicked) {
        statusRef.current.isClicked = false;
      }
    };

    document.addEventListener("click", handleDocClick);
    document.addEventListener("mousemove", handler);

    return () => {
      document.removeEventListener("mousemove", handler);
      document.removeEventListener("click", handleDocClick);
    };
  });

  return (
    <div
      onClick={handleMouseDown}
      onMouseDown={handleMouseDown}
      className="resizer"
      onTouchStart={() => {
        statusRef.current.isClicked = !statusRef.current.isClicked;
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        updateResizer(e.touches[0].pageX);
      }}
      onTouchEnd={(e) => (statusRef.current.isClicked = false)}
    ></div>
  );
}

export default Resizer;
