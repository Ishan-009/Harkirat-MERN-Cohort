import React, { useState, useEffect } from "react";

function useStatus() {
  const [status, setStatus] = useState(window.navigator.onLine);
  useEffect(() => {
    window.addEventListener("online", () => {
      setStatus(true);
    });
    window.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);

  return status;
}

export default useStatus;
