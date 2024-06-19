import { useEffect, useState } from "react";
import axios from "axios";
function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const value = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 10000);
    return () => {
      clearInterval(value);
    };
  }, [n]);

  return { todos, loading };
}

export default useTodos;
