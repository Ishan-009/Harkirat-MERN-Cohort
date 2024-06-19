import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [sum, setSum] = useState(0);

  function calcSum() {
    let fakeSum = 0;
    for (let i = 1; i <= parseInt(value, 10); i++) {
      fakeSum += i;
    }
    setSum(fakeSum);
  }

  function updateValue(e) {
    let input = e.target.value;
    setValue(input);
  }

  return (
    <div>
      <input onChange={updateValue} type="number" />
      <div>Sum is {sum}</div>
      <button onClick={calcSum}>Sum</button>
    </div>
  );
}

export default App;
