"use strict";
//Defining variable with data types
const x = 1;
console.log(x);
// defining arguments in function with basic data types
function greet(firstName) {
    console.log("Hello" + firstName);
}
greet("Ishan");
function sum(a, b) {
    return a + b;
}
const sumResult = sum(1, 2);
console.log(sumResult);
// Type Interference
// TSC compiler automatically detects what is function going to return based on passed data types of argumetn and all, this is known as type interference in typescript , when you hover on the function you will see it says it returns boolean.
function isAdult(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isAdult(19));
// Passing function as an argument and defining the return type of that function in the argument
function fun(fn) {
    setTimeout(fn, 1000);
}
fun(function () {
    console.log("Meet you up after 1sec");
});
function isLegalAge(user) {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isLegalAge({ name: "ishan", age: 19, country: "India", gender: "Male" }));
class Employee {
    constructor(name, age, country, gender) {
        this.name = name;
        this.age = age;
        this.country = country;
        this.gender = gender;
    }
    greet() {
        console.log(`Hello Mr./Ms. ${this.name} of ${this.age} years lives in ${this.country}`);
    }
}
const employee = new Employee("Ishan", 19, "India", "Male");
employee.greet();
const techLead = {
    name: "Ishan",
    age: 18,
    gender: "male",
    country: "India",
    email: "ishanmoorjmalani009@gmail.com",
    greet() { },
    managerTask() { },
    intro() {
        console.log("Hi I am tech lead");
    },
};
// Arrays
function techLeadIntro(techlead) {
    console.log(techlead.intro());
}
techLeadIntro(techLead);
function employeeData(employee) {
    console.log(employee);
}
employeeData([
    {
        name: "Ishan",
        age: 23,
        gender: "Male",
        country: "India",
        email: "abc@gmail.com",
        greet() { },
    },
]);
