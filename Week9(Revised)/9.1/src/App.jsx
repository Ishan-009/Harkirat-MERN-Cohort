import React, { useState, useEffect } from "react";
import "./App.css";
import ReactLifeCycleComponent from "./components/ReactLifeCycleComponent";
import ClassLifeCycleEvents from "./components/ClassLifeCycleEvents";
import useTodos from "./hooks/useTodos";
function App() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setRender((r) => !r);
    }, 5000);
  }, []);
  // return <>{render ? <ReactLifeCycleComponent /> : <div></div>}</>;

  return <>{render ? <ClassLifeCycleEvents /> : <div>Hi there</div>}</>;
}

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
