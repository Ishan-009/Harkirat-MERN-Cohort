// Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
// What's Anagram?
// - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

const { string } = require("yargs");

// Once you've implemented the logic, test your code by running
// - `npm run test-anagram`
// */

// examples of anagram strings

function isAnagram(str1, str2) {
  // precondition check

  if (str1.length !== str2.length) {
    return false;
  }

  const map1 = new Map();
  const map2 = new Map();

  // Process str1 (convert to lowercase)
  for (let char of str1.toLowerCase()) {
    map1.set(char, (map1.get(char) ?? 0) + 1);
  }

  // Process str2 (convert to lowercase)
  for (let char of str2.toLowerCase()) {
    map2.set(char, (map2.get(char) ?? 0) + 1);
  }

  let counter = true;
  // Compare two maps keys and values
  for (let char of str1.toLowerCase()) {
    if (map1.get(char) !== map2.get(char)) {
      return false; // Mismatch found, return false immediately
    }
  }

  return counter;
}

const result = isAnagram("Debit Card", "Bad Credit");

console.log(result);

module.exports = isAnagram;
