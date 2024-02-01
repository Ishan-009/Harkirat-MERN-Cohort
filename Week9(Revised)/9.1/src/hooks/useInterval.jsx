import React, { useEffect } from "react";

function useInterval(fn, timeout) {
  useEffect(() => {
    const interval = setInterval(fn, timeout);
    return () => {
      clearInterval(interval);
    };
  }, []);
}

export default useInterval;
