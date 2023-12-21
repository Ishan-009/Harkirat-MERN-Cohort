// Using Map Function
// Given Array as input , multiply every value with n = 5 and transform

const input = [2, 3, 4, 5, 5, 6, 67, 7];
const n = 5;

const output = input.map(function (i) {
  return i * n;
});

console.log(output);
