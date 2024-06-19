import useDebounce from "../hooks/useDebounce";
import { useState, useEffect } from "react";
function DebounceComponent() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />

      <p>{debouncedValue}</p>
    </div>
  );
}

export default DebounceComponent;
