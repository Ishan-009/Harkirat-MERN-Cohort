/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todo = [];
  }
  add(data) {
    this.todo.push(data);
  }

  remove(index) {
    if (index > 0 && index < this.todo.length && index == 0) {
      this.todo.splice(index, 1);
    }
    return null;
  }

  update(index, data) {
    if (index > 0 && index < this.todo.length) {
      this.todo[index] = data;
    }
    return null;
  }

  getAll() {
    return this.todo;
  }

  get(index) {
    if (index > 0 || index < this.todo.length || index === 0) {
      return this.todo[index];
    }
    return null;
  }

  clear() {
    this.todo = [];
  }
}
const todo = new Todo();

todo.add(10);
todo.add(20);
todo.add(30);
let result = todo.getAll();
console.log(result);
module.exports = Todo;
