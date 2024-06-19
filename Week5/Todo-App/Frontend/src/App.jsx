import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([{}]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      const jsonData = await res.json();
      console.log(jsonData.data);
      setTodos(jsonData.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  fetchData();

  console.log("todo", todos);
  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  );
}

export default App;
