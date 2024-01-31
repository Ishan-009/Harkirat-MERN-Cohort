import React, { useEffect, useState } from "react";
function ReactLifeCycleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.error("mounted"); // component mounts

    return () => {
      console.log("unmounted"); // component unmounts
    };
  }, []);

  function incrementCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default ReactLifeCycleComponent;
