/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const convertedString = str.toLowerCase();

  // Iterate over string and compare if it is vowel or not
  let vowelCounter = 0;

  for (let i = 0; i < convertedString.length; i++) {
    let char = convertedString[i];

    if (
      char === "a" ||
      char === "e" ||
      char === "i" ||
      char === "o" ||
      char === "u"
    ) {
      vowelCounter += 1;
    }
  }

  return vowelCounter;
}

const stringInput = "Ishan";
const result = countVowels(stringInput);

console.log(result);

module.exports = countVowels;
