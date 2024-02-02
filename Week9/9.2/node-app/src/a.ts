//Defining variable with data types
const x: number = 1;
console.log(x);

// defining arguments in function with basic data types
function greet(firstName: string) {
  console.log("Hello" + firstName);
}
greet("Ishan");

function sum(a: number, b: number): number {
  return a + b;
}

const sumResult = sum(1, 2);
console.log(sumResult);

// Type Interference

// TSC compiler automatically detects what is function going to return based on passed data types of argumetn and all, this is known as type interference in typescript , when you hover on the function you will see it says it returns boolean.

function isAdult(age: number) {
  if (age > 18) {
    return true;
  } else {
    return false;
  }
}

console.log(isAdult(19));

// Passing function as an argument and defining the return type of that function in the argument

function fun(fn: () => void) {
  setTimeout(fn, 1000);
}

fun(function () {
  console.log("Meet you up after 1sec");
});

// Interface:- used to group in bunch of variables, methods inside a single unit
// Interface can be implmented in class or can be used by variable, argument in a function , in which case that has to have all properties/variables and methods as defined in interface.

interface User {
  name: string;
  age: number;
  gender: string;
  country: string;
  email?: string;
  // optional parameter
}

function isLegalAge(user: User) {
  if (user.age > 18) {
    return true;
  } else {
    return false;
  }
}

console.log(
  isLegalAge({ name: "ishan", age: 19, country: "India", gender: "Male" })
);

class Employee implements User {
  name: string;
  age: number;
  country: string;
  gender: string;
  email?: string;

  constructor(name: string, age: number, country: string, gender: string) {
    this.name = name;
    this.age = age;
    this.country = country;
    this.gender = gender;
  }

  public greet(): void {
    console.log(
      `Hello Mr./Ms. ${this.name} of ${this.age} years lives in ${this.country}`
    );
  }
}

const employee = new Employee("Ishan", 19, "India", "Male");

employee.greet();

// types in typescript , lets you aggregate property and methods inside them similar to interface just has few features on top of it

// union/or
// intersection

// union/ or operator , here if you are not sure if id is in string or integer you can use this union / or operator and can be used between types and interfaces
type EmployeeId = String | Number;

type Person = {
  employeeId: EmployeeId;
  name: string;
};

type Manager = {
  name: string;
  managerTask: () => void;
  intro: () => void;
};

// intersection
type TechLead = Employee & Manager;

const techLead: TechLead = {
  name: "Ishan",
  age: 18,
  gender: "male",
  country: "India",
  email: "ishanmoorjmalani009@gmail.com",
  greet() {},
  managerTask() {},
  intro() {
    console.log("Hi I am tech lead");
  },
};

// Arrays

function techLeadIntro(techlead: TechLead) {
  console.log(techlead.intro());
}

techLeadIntro(techLead);

function employeeData(employee: Employee[]) {
  console.log(employee);
}

employeeData([
  {
    name: "Ishan",
    age: 23,
    gender: "Male",
    country: "India",
    email: "abc@gmail.com",
    greet() {},
  },
]);
