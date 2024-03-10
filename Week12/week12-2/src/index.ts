interface User {
  readonly id: string;
  name: string;
  readonly age: number;
  email: string;
  password: string;
}

type UserProfile = Pick<User, "name" | "email">;

type optionalUserProfileProps = Partial<UserProfile>;

const displayUserProfile = function (user: optionalUserProfileProps) {
  console.log(user);
};

displayUserProfile({
  name: "Ishan",
  email: "ishanmoorjmalani009@gmail.com",
});

//  Pick allows us to pick subset of properities from the type or interface, like here in userprofile we want to display only user email and password data so instead of redefinign data type but that will cause to do changes multiple places so here instead we use pick to pick only required set of properties from type or interface that we wanna use in our program function

// partial allows us to partially define a type or interface in that it makes all the properties optional with this we can utilize that partial type in our function
// usecase :- if user updates some part of code it does not allows update all values , sometimes it might update username or something so here other values are optional

// Readonly
// you can implement readonly functionality on internal propeties of interface and types
// by applying readonly on every property in type or interface or you can implement whole object as readonly
// it enures internal value of objects, array is not changed internally too.

const user: Readonly<User> = {
  id: "0001",
  age: 23,
  name: "Ishan",
  email: "ishanmoorjmalani009@gmail.com",
  password: "Ishan@2000",
};

// key-value pairs in ts , one way is simply defining object another way is to use record or maps

// Record
// lets you give a cleaenr type to objects

// instead of doign this
// example 1
interface Users {
  name: string;
  id: string;
}

type userObj = {
  [key: string]: Users;
};

const usersData: userObj = {
  user1: { name: "Ishan", id: "0001" },
};

// we can use this record here to clearing define the objects

type Employees = Record<string, Users>;

const userData: Employees = {
  user1: { name: "Ishan", id: "0001" },
};

console.log(userData["user1"]);
// accessing record object

// Record is typescript thing not a js level thing

// maps js based concept to define key value pair
// using maps is sometimes prefer because sometimes instead of accessing object like user["Ishan"]
// its better to write this syntax like user.get("Ishan");, seems more logical and understandable instead of accessing object sometimes seem consuming
interface salesman {
  name: string;
  age: number;
}

const salesmanMap = new Map<string, salesman>();

salesmanMap.set("Ishan", { name: "Ishan Moorjmalani", age: 23 });

console.log(salesmanMap.get("Ishan"));

// Exclude again a typescript functinality which lets you exclude some properties of type or interface.
// if you know you want to pick only certain value and exclude some value from the interfcae or type or object you can use exclude

type EventType = "scroll" | "click" | "mousemove";

type ExcludeEventType = Exclude<EventType, "scroll">;

const handleEvent = (eventType: ExcludeEventType) => {
  console.log(eventType + "done by user");
};

// handleEvent("scroll");
// will  give you error as we have excluded scroll type

// for any other type like click or mousemove it will work

handleEvent("click");

// Type Interference in zod , zod type interference
