// Here JS provides some inbuilt async function like setTimeout which executes asynchronously without blocking the flow of the program or without blocking the main thread to itself,

// there are three or mote function of inbuilt js which provide asynchronous behaviour, such as setTimeOut , .readFile etc

console.log("HI");

setTimeout(
  displayData,
  function () {
    console.log("Data Displayed");
  },
  2000
);

function displayData() {
  console.log({ name: "ishan", age: 23 });
}

console.log("Ending Line of Code");
