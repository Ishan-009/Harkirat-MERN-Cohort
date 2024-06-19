const fs = require("fs");

// Reading a File
// readFile(path,format,callbackFunction)

fs.readFile(
  "G:/Harkirat MERN Cohort/Week2/Assignments/easy/a.txt",
  (error, output) => {
    if (error) throw error;

    console.log(output.toString());
  }
);

// let sum = 0;
// for (let index = 0; index < 1000000000000; index++) {
//   sum += index;
// }

// console.log(sum);
