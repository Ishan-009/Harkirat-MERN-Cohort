import { useState } from "react";
let counter = 0;
function App() {
  return (
    <>
      <CardComponent>
        <CardTitleComponent></CardTitleComponent>
      </CardComponent>
    </>
  );
}

function CardComponent({ children }) {
  return <div style={{ border: "5px solid black" }}>{children}</div>;
}

function CardTitleComponent() {
  const [title, setTitle] = useState("Card Title");
  function updateTitle() {
    setTitle(Math.random() + "Title");
  }
  return (
    <div>
      <button onClick={updateTitle}>Change Title</button>
      <div>{title}</div>
    </div>
  );
}

export default App;
