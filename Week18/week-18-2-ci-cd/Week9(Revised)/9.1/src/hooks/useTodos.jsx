import React, { useState, useEffect } from "react";
import axios from "axios";

function useTodos(time) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((result) => {
        setTodos(result.data.todos);
        setLoading(false);
      });
    }, time * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { todos, loading };
}

export default useTodos;
