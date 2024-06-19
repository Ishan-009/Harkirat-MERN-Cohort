// Read a file , remove the white spaces and rewrite to the same file

const fs = require("fs");

// Reading a file and getting content

let string = "";
let path = "G:/Harkirat MERN Cohort/Week2/Assignments/medium/file.txt";
fs.readFile(path, function (error, output) {
  string = output.toString();

  // Removing White Spaces

  const finalString = string.replace(/\s/g, "");

  // Rewrite into the same file with finalString with removed white spaces

  fs.writeFile(path, finalString, function (error) {
    if (error) return console.error(error);

    console.log("Successfully rewritten into the file ");
  });
});
