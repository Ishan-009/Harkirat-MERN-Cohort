import { useEffect, useState } from "react";

function LifeCycleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mount");
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 2000);

    // componentWillUnmount
    return () => {
      clearInterval(interval);
      console.log("component unmount");
    };
  }, [count]); // empty dependency array to run only on mount

  return (
    <div>
      <p>{count}</p>
    </div>
  );
}

export default LifeCycleComponent;
