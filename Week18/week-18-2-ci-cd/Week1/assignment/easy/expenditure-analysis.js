/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  // we need to iterate over arary of objects and then we also have to somehow check if array of objects has same category then we should add/sum up total amount to the same category , do not duplicate

  const transactionsMap = new Map();

  // mapping transactions in transactions Map() , storing and setting category and price

  for (const transaction of transactions) {
    let { category, price } = transaction;

    if (transactionsMap.has(category)) {
      transactionsMap.set(category, transactionsMap.get(category) + price);
    } else {
      transactionsMap.set(category, price);
    }
  }
  // converting map to object array format using array.map
  const result = Array.from(
    transactionsMap,
    function ([category, totalAmount]) {
      return { category: category, totalSpent: totalAmount };
    }
  );

  return result;
}

const transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: "Food",
    itemName: "Pizza",
  },
  {
    id: 2,
    timestamp: 1656259600000,
    price: 20,
    category: "Food",
    itemName: "Burger",
  },
  {
    id: 3,
    timestamp: 1656019200000,
    price: 15,
    category: "Clothing",
    itemName: "T-Shirt",
  },
  {
    id: 4,
    timestamp: 1656364800000,
    price: 30,
    category: "Electronics",
    itemName: "Headphones",
  },
  {
    id: 5,
    timestamp: 1656105600000,
    price: 25,
    category: "Clothing",
    itemName: "Jeans",
  },
];
const result = calculateTotalSpentByCategory(transactions);
console.log(result);
module.exports = calculateTotalSpentByCategory;
