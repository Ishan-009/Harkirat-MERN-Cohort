import { useEffect } from "react";

function useInterval(fn, time) {
  useEffect(() => {
    const interval = setInterval(() => {
      fn();
    }, time);

    return () => {
      clearInterval(interval);
    };
  }, []);
}

export default useInterval;
