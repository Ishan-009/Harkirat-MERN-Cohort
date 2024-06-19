/* eslint-disable react/prop-types */
/** todos = [
 *   {
 *     title:"go to gym"
 *     description:"go to gym"
 *   }
 * ]
 **/
// let todos = [
//   {
//     title: "title",
//     description: "description",
//   },
// ];
export function Todos({ todos }) {
  console.log("todos", todos);
  return (
    <div>
      {todos &&
        todos.map(function (todo) {
          return (
            <div key={todo.title}>
              <h1>{todo.title}</h1>
              <h2>{todo.description}</h2>
              <button>
                {todo.completed === true ? "Completed" : "Incomplete"}
              </button>
            </div>
          );
        })}
    </div>
  );
}
