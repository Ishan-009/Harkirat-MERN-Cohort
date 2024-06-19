import React, { useState, useEffect } from "react";
import "./App.css";
import ReactLifeCycleComponent from "./components/ReactLifeCycleComponent";
import ClassLifeCycleEvents from "./components/ClassLifeCycleEvents";
import useTodos from "./hooks/useTodos";
import useOnline from "./hooks/useOnline";
import useDebounce from "./hooks/useDebounce";
import useInterval from "./hooks/useInterval";
function App() {
  const { todos, loading } = useTodos(5);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  function changeValue(e) {
    setInputValue(e.target.value);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserStatus />
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <input type="text" onChange={changeValue} />
      <p>{debouncedValue}</p>
      <UserIntervalComponent />
    </div>
  );
}

function UserStatus() {
  const online = useOnline();

  if (online) {
    return <div>Online</div>;
  } else {
    return <div>Offline</div>;
  }
}

function UserIntervalComponent() {
  useInterval(() => {
    printHelloWorld("");
  }, 5000);

  function printHelloWorld() {
    console.log("Hello World");
  }
}

// function App() {
//   const [render, setRender] = useState(true);
//   useEffect(() => {
//     setInterval(() => {
//       setRender((r) => !r);
//     }, 5000);
//   }, []);
//   // return <>{render ? <ReactLifeCycleComponent /> : <div></div>}</>;

//   return <>{render ? <ClassLifeCycleEvents /> : <div>Hi there</div>}</>;
// }

// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }

//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   render() {
//     return (
//       <div>
//         <p>{this.state.count}</p>
//         <button onClick={this.incrementCount}>Increment</button>
//       </div>
//     );
//   }
// }

export default App;
