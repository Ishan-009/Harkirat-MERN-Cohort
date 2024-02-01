import React, { useState, useEffect } from "react";

function useDebounce(inputValue, time) {
  const [debounceValue, setDebounceValue] = useState(inputValue);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebounceValue(inputValue);
    }, time);
    return () => {
      clearInterval(interval);
    };
  }, [inputValue]);

  // dependency very imp here, as we want it to run on latest updated userchange and to get delayed debounced value, in short, we want to get latest delayed debounced value dependded on every inputValue change made by user in search text bar

  return debounceValue;
}

export default useDebounce;
