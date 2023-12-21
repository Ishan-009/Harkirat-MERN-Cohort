//Writing Custom Map function

function customMap(array, callback) {
  const result = [];

  for (let index = 0; index < array.length; index++) {
    result.push(callback(array[index]));
  }

  return result;
}

const arr = [1, 2, 3, 4, 5, 6];

const output = customMap(arr, function (n) {
  return n * 5;
});

console.log(output);
