/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(strInput) {
  const str = strInput.replace(/[^\w]/g, "").toLowerCase(); // Remove punctuation marks
  const revStr = str.split("").reverse().join("");

  const isPalindrome = str === revStr;
  console.log(str);
  console.log(revStr);
  return isPalindrome;
}

let str = "Eva, can I see bees in a cave?";

const result = isPalindrome(str);
// console.log(result);
module.exports = isPalindrome;

// Problem arrived in solving this question, dealing with spaces , have to work on more such problems for having bit of grip.
