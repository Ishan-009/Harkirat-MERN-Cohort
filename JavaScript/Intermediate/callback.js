// Basically, in callback what we do is we can pass function as a argument into a function and then callback the function when required , ex:- when calling multiple api calls and then based on that calling other apis
function cube(n) {
  return n * n * n;
}

function sumOfTwoCubes(num1, num2, cube) {
  const a = cube(num1);
  const b = cube(num2);

  return a + b;
}

console.log(sumOfTwoCubes(2, 3, cube));
