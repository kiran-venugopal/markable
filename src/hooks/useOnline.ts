import { useEffect, useState } from "react";

function useOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const offlineHandler = () => setIsOnline(false);
    const onlineHandler = () => setIsOnline(true);

    window.addEventListener("offline", offlineHandler);
    window.addEventListener("online", onlineHandler);

    return () => {
      window.removeEventListener("offline", offlineHandler);
      window.removeEventListener("online", onlineHandler);
    };
  }, []);

  return isOnline;
}

export default useOnline;
