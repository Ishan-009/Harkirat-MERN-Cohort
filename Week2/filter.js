// Using Filter function

const arr = ["Ishan", "Ravi", "Elena", "Raman"];

const output = arr.filter(function (n) {
  if (n.startsWith("R")) {
    return true;
  } else {
    return false;
  }
});

console.log(output);
