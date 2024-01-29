import useTodos from "../hooks/useTodos";

function DataFetchComponent() {
  const { todos, loading } = useTodos(10);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default DataFetchComponent;
