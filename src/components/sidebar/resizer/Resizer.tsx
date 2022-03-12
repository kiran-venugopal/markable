import {
  MouseEventHandler,
  MutableRefObject,
  TouchEventHandler,
  useEffect,
  useRef,
} from "react";
import "./resizer.css";

type PropsType = {
  elementRef: MutableRefObject<HTMLDivElement>;
};

function Resizer({ elementRef }: PropsType) {
  const statusRef = useRef({ isClicked: false });
  const timerRef = useRef<NodeJS.Timeout>();

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    console.log("clicked", statusRef);
    statusRef.current.isClicked = !statusRef.current.isClicked;
  };

  const getWidth = (pageX: number) => {
    if (window.innerWidth <= 800) {
      return pageX <= 16 ? 16 : pageX;
    } else return pageX <= 100 ? 100 : pageX;
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // console.log(statusRef.current.startX, e.pa);
      if (statusRef.current.isClicked) {
        const newWidth = getWidth(e.pageX);
        console.log(newWidth, window.innerWidth);
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

    const handleDocClick = (e: MouseEvent) => {
      if (statusRef.current.isClicked) {
        console.log("removed");
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
        console.log("start");
        statusRef.current.isClicked = !statusRef.current.isClicked;
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        if (statusRef.current.isClicked) {
          const newWidth = getWidth(e.touches[0].pageX);
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
      }}
      onTouchEnd={(e) => (statusRef.current.isClicked = false)}
    ></div>
  );
}

export default Resizer;
