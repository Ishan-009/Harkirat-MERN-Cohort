import { useEffect, useState } from "react";

function useOnline() {
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("onLine", () => {
      setOnline(true);
    });

    window.addEventListener("offLine", () => {
      setOnline(false);
    });
  }, []);

  return online;
}

export default useOnline;
