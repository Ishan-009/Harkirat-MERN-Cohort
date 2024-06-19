export function CreateTodo() {
  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="title"
      />
      <br />
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="description"
      />
      <br />
      <button>Create Todo</button>
    </div>
  );
}
