import useInterval from "../hooks/useInterval";

function IntervalComponent() {
  const interval = useInterval(print, 1000);
  return <div></div>;
}

function print() {
  console.log("Hello");
}

export default IntervalComponent;
