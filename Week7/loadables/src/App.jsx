import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilStateLoadable } from "recoil";
import { todosAtomFamily } from "./atoms";
import { useState } from "react";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  console.log(todo);
  if (todo.state === "loading") {
    return <div>loading</div>;
  } else if (todo.state === "hasError") {
    return <div> Error Occured at server side</div>;
  } else {
    return (
      <>
        {todo.contents.title}
        {todo.contents.description}
        <br />
      </>
    );
  }
}

export default App;
