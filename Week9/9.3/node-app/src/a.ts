import "express";

//Emums

enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
// using enums for specified value inputs to our function argument with human readable form input which is quite efficient to work with
function doSomething(keyPressed: Direction) {
  if (keyPressed === Direction.Down) {
    console.log("Move Down");
  } else if (keyPressed === Direction.Up) {
    console.log("Move Up");
  } else if (keyPressed === Direction.Left) {
    console.log("Move Left");
  } else if (keyPressed === Direction.Right) {
    console.log("Move Right");
  }
}

doSomething(Direction.Left);

// Generics
// used to define function with any input type depending on function call datatype, from this typescript can infer the type and we can use certain value such as string functions on our output from function
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Ishan").toUpperCase());
// converts to uppercase
console.log(identity<number>(1));

// in function call, defining generics type using angular brackets , you can specifiy either or here, it can also automatically detect the type so even though you dont use the bracket it can detect , but yes if you pass multiple data types in function call then it wil assume it is or/union type , to avoid that you can explicity define the type of the fucntion call argument
