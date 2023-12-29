let globalId = 1;
let todoState = [];
let oldTodoState = [];

function addTodoToDom(todo) {
  const parentDiv = document.getElementById("todos");

  for (let obj of todo) {
    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("data-todo-id", obj.id); // Set a common attribute
    // Setting attribute inside divs
    containerDiv.setAttribute("data-title", obj.title);
    containerDiv.setAttribute("data-description", obj.description);
    containerDiv.classList.add("todo-container");
    // creating Inner divs
    const titleDiv = document.createElement("div");
    const todoIdDiv = document.createElement("div");
    const descriptionDiv = document.createElement("div");
    titleDiv.classList.add("todo-title");
    descriptionDiv.classList.add("todo-description");
    // Creating Edit Button
    const editButton = document.createElement("button");
    editButton.setAttribute("todoId", obj.id);
    editButton.classList.add("editTodo");
    editButton.textContent = "Edit Todo";
    editButton.onclick = editTodo;
    // Creating removeButton
    const removeButton = document.createElement("button");
    removeButton.setAttribute("todoId", obj.id);
    removeButton.classList.add("removeTodo");
    removeButton.textContent = "Delete Todo";
    removeButton.onclick = deleteTodo;
    // Setting Values Inside Divs
    todoIdDiv.innerHTML = obj.id;
    titleDiv.innerHTML = obj.title;
    descriptionDiv.innerHTML = obj.description;

    // Appending Divs and buttons
    containerDiv.appendChild(todoIdDiv);
    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(descriptionDiv);
    containerDiv.append(editButton);
    containerDiv.append(removeButton);
    parentDiv.append(containerDiv);
  }
}

function removeTodoFromDom(todos) {
  for (const todo of todos) {
    const containerToRemove = document.querySelector(
      `[data-todo-id="${todo.id}"]`
    );
    if (containerToRemove) {
      containerToRemove.remove();
    }
  }
}

function updateTodoInDom(newTodo) {
  for (let obj of newTodo) {
    // for every id present in newtodo array of object, we need to find that container div and then we have to update them respectfully
    const updateContainer = document.querySelector(
      `[data-todo-id="${obj.id}"]`
    );

    updateContainer.querySelector(".todo-title").textContent = obj.title;
    updateContainer.querySelector(".todo-description").textContent =
      obj.description;
  }
}

function updateState(newTodos) {
  console.log("new todo function start", newTodos);
  console.log(
    "oldtodostate function value at start function of update state",
    oldTodoState
  );
  // Check existing Ids
  const existingIds = new Set(oldTodoState.map((todo) => todo.id));
  // console.log("Existing ids", existingIds);
  const newIds = new Set(newTodos.map((todo) => parseInt(todo.id)));
  // console.log("new ids", newIds);
  // getting maximum Ids
  const maximumIds = Math.max(...existingIds);

  const added = [];
  const deleted = [];
  const updated = [];

  // Added & update array edge case
  for (let key of newTodos) {
    const id = key.id;

    if (!existingIds.has(id)) {
      // If the id is not present in oldTodoState, it's newly added
      added.push({
        id,
        title: key.title,
        description: key.description,
        isNewlyAdded: true,
      });
    } else {
      // Check if the id exists in oldTodoState and if the object properties are different

      const oldTodo = oldTodoState.find((todo) => todo.id === id);

      if (oldTodo && !compareObjects(key, oldTodo)) {
        console.log("object is updated one ");
        updated.push(key);
      }
    }
  }

  // Determine missing ids (deleted items)
  const missingIds = [];
  for (let id of existingIds) {
    if (!newIds.has(id)) {
      missingIds.push(id);
    }
  }

  // console.log("Missing IDs:", missingIds);

  // Generate deleted array
  for (let id of missingIds) {
    deleted.push({ id, ...oldTodoState[id], isDeleted: true });
  }

  // console.log("Added array:", added);
  // console.log("Deleted array:", deleted);
  console.log("Updated array:", updated);
  addTodoToDom(added);
  removeTodoFromDom(deleted);
  updateTodoInDom(updated);

  // calculate these 3 arrays
  // call addTodo, removeTodo, updateTodo functions on each of the
  // elements
  oldTodoState = [...newTodos]; // creating new copy of the array to avoid pointing to the todostate array

  // console.log(oldTodoState);
}

function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  todoState.push({
    title: title,
    description: description,
    id: globalId++,
  });

  updateState(todoState);
}

function deleteTodo() {
  const todoId = +this.getAttribute("todoId"); // or use parseInt(this.getAttribute("todoId"), 10);

  for (let i = 0; i < todoState.length; i++) {
    if (todoState[i].id === todoId) {
      todoState.splice(i, 1);
      break; // Stop the loop after removing the item
    }
  }
  console.log("todo state array ", todoState);
  console.log("old todo state array ", oldTodoState);
  updateState(todoState);
}

function editTodo() {
  const todoId = parseInt(this.getAttribute("todoId"), 10); // or use
  const todoContainer = this.closest(".todo-container");

  const newTitle = prompt(
    "Enter new title:",
    todoContainer.getAttribute("data-title")
  );
  const newDescription = prompt(
    "Enter new description:",
    todoContainer.getAttribute("data-description")
  );

  // Create a deep copy of todoState
  // did this as both todo state element and oldtodostate were pointing to same object so if i updated it would reflet in both so had to create a deep copy to avoid it

  const updatedTodoState = JSON.parse(JSON.stringify(todoState));

  let todoFoundFlag = 0;
  for (let obj of updatedTodoState) {
    if (obj.id === todoId) {
      todoFoundFlag = 1;
      obj.title = newTitle;
      obj.description = newDescription;
    }
  }

  console.log("editui", updatedTodoState);

  if (todoFoundFlag !== 1) {
    alert("Something Wrong Occured, Id not found");
  }

  updateState(updatedTodoState);
}

function compareObjects(obj1, obj2) {
  return obj1.title === obj2.title && obj1.description === obj2.description;
}
