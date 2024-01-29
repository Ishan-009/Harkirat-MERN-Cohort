import { useState, useEffect } from "react";
function useDebounce(inputValue, time) {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    const interval = setTimeout(() => {
      setValue(inputValue);
    }, time);

    return () => {
      clearInterval(interval);
    };
  }, [inputValue]);

  return value;
}

export default useDebounce;
