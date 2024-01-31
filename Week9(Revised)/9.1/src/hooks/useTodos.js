import React, { useState } from "react";
import { axios } from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://sum-server.100xdevs.com/todos")
      .then((result) => {
        setTodos(result.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todos]);

  return todos;
}

export default useTodos;
