import { useState, useMemo, useEffect } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  const [debouncedInput, setDebounceInput] = useState(input);
  useEffect(() => {
    setTimeout(() => {
      setDebounceInput(input);
    }, 500);
  }, [input]);

  const expensiveValue = useMemo(() => {
    let factorialLength = parseInt(input);
    let factorial = 1;
    for (let i = 1; i <= factorialLength; i++) {
      factorial *= i;
    }
    return factorial;
  }, [debouncedInput]);

  function changeValue(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <input type="number" onChange={changeValue} />
      <p>Calculated Value: {expensiveValue}</p>
    </div>
  );
}
