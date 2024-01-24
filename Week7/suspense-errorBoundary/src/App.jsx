import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilStateLoadable } from "recoil";
import { todosAtomFamily } from "./atoms";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading Content...</div>}>
          <Todo id={1} />
          <Todo id={2} />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  if (todo.state === "loading") {
    return <div>loading</div>;
  }

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

export default App;
