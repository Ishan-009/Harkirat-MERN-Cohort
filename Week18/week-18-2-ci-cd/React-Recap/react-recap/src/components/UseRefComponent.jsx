import React, { useEffect, useRef } from "react";

// use to access dom elements

// it can be also used to save dom elements and does with this we can also avoid child rerender

function UseRefComponent() {
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML = "10";
    }, 3000);
  }, []);

  const incomeTax = 2000;

  return <div ref={divRef}>The Income tax is {incomeTax}</div>;
}

export default UseRefComponent;
